import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { load } from "cheerio";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const SOURCE_DIR = path.resolve("src/site");
const CONTENT_DIR = path.resolve("content");
const PAGE_DIR = path.join(CONTENT_DIR, "pages");
const SEO_FILE = path.join(CONTENT_DIR, "seo.json");
const HOME_HERO_FILE = path.join(CONTENT_DIR, "home/hero.json");
const FACTS_FILE = path.join(CONTENT_DIR, "facts/public-facts.json");
const REDIRECTS_FILE = path.join(CONTENT_DIR, "redirects/dsmlp-docs.json");
const SHELL_FILE = path.join(SOURCE_DIR, "_shell.html");
const OUTPUT_DIR = path.resolve(process.env.OUTPUT_DIR || "dist");
const site = await readJson(path.join(CONTENT_DIR, "site.json"));
const cssVersion = async (name) =>
  createHash("sha256").update(await readFile(path.join(SOURCE_DIR, `_resources/css/${name}`))).digest("hex").slice(0, 12);
const AGENT_SITE_CSS_VERSION = await cssVersion("agent-site.css");
const LANDING_HUBS_CSS_VERSION = await cssVersion("landing-hubs.css");
const PARASOL_CSS_VERSION = await cssVersion("parasol.css");
// The production origin is not provisioned yet. It lives in content/site.json so
// the cutover is a one-line change; canonical URLs and JSON-LD read it from there.
const OFFICIAL_ORIGIN = site.origin;
const SITE_BASE_PATH = normalizeBasePath(process.env.SITE_BASE_PATH || "");
// A production build is served from a domain root, so it carries no base path.
// Anything with one is the GitHub Pages review build, which must not be indexed.
const IS_PRODUCTION_BUILD = SITE_BASE_PATH === "";
const UNLISTED_ROUTES = new Set();
const AFTER_RENDER_SCRIPTS = new Set([
  "https://cdn.ucsd.edu/cms/decorator-5/scripts/modernizr.min.js",
  "https://cdn.ucsd.edu/cms/decorator-5/scripts/jquery.min.js",
  "https://cdn.ucsd.edu/cms/decorator-5/scripts/bootstrap.min.js",
  "https://cdn.ucsd.edu/cms/decorator-5/scripts/vendor.min.js",
  "https://cdn.ucsd.edu/cms/decorator-5/scripts/base.min.js",
  "https://cdn.ucsd.edu/cms/decorator-5/scripts/decorator.js",
  "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.10/handlebars.runtime.min.js",
  "https://cdn.ucsd.edu/cms/search/js/templates.js",
  "https://cdn.ucsd.edu/cms/search/js/search-api.js",
]);
const EMERGENCY_BROADCAST_SCRIPT = "https://www.ucsd.edu/common/_emergency-broadcast/message.js";
const TRITONGPT_WIDGET_SCRIPT = "https://cdn.ucsd.edu/tritongpt/widget/js/tgpt-loader.js";
// PARASOL has no measurement ID of its own yet. Set `analytics.googleAnalyticsId`
// in content/site.json to turn the tag on; never borrow another site's ID.
const GOOGLE_ANALYTICS_ID = site.analytics?.googleAnalyticsId || null;
const GOOGLE_ANALYTICS_COOKIE_DOMAIN = new URL(OFFICIAL_ORIGIN).hostname;
const PRECONNECT_ORIGINS = ["https://cdn.ucsd.edu", "https://www.ucsd.edu", "https://fonts.googleapis.com", "https://fonts.gstatic.com"];
const DEFAULT_BANNER = "https://cdn.ucsd.edu/cms/decorator-5/img/blue-grit.jpg";

function normalizeBasePath(value) {
  if (!value || value === "/") return "";
  return `/${value.replace(/^\/+|\/+$/g, "")}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function asDate(value) {
  if (value instanceof Date) return value;
  return new Date(`${value}T12:00:00Z`);
}

function isoDate(value) {
  const date = asDate(value);
  if (Number.isNaN(date.valueOf())) throw new Error(`Invalid date: ${value}`);
  return date.toISOString().slice(0, 10);
}

function requireFields(object, fields, source) {
  const missing = fields.filter((field) => object[field] === undefined || object[field] === null || object[field] === "");
  if (missing.length) throw new Error(`${source} is missing required fields: ${missing.join(", ")}`);
}

const markdown = new MarkdownIt({ html: true, linkify: false, typographer: true });
const defaultLinkOpen =
  markdown.renderer.rules.link_open || ((tokens, index, options, env, self) => self.renderToken(tokens, index, options));
markdown.renderer.rules.link_open = (tokens, index, options, env, self) => {
  const href = tokens[index].attrGet("href") || "";
  if (/^https?:\/\//i.test(href)) {
    tokens[index].attrSet("target", "_blank");
    tokens[index].attrSet("rel", "noopener noreferrer");
  }
  return defaultLinkOpen(tokens, index, options, env, self);
};

async function readJson(filename) {
  return JSON.parse(await readFile(filename, "utf8"));
}

// `<!-- lang-ok: reason -->` markers are editorial notes for
// scripts/language-check.mjs. They are not published.
function stripLanguageCheckComments(body) {
  return body.replace(/^[ \t]*<!--\s*lang-ok:[\s\S]*?-->[ \t]*\n?/gm, "");
}

function isCanonicalMarkdownFilename(name) {
  return name.endsWith(".md") && !/ \d+\.md$/i.test(name);
}

// `format: html` pages are ported documentation whose bodies are already HTML.
// Markdown would split their <pre> blocks at blank lines, so they pass through.
async function loadMarkdownDirectory(directory, requiredFields) {
  const filenames = (await readdir(directory)).filter(isCanonicalMarkdownFilename).sort();
  const entries = [];
  for (const filename of filenames) {
    const parsed = matter(await readFile(path.join(directory, filename), "utf8"));
    requireFields(parsed.data, requiredFields, path.relative(process.cwd(), path.join(directory, filename)));
    parsed.data.lastReviewed = isoDate(parsed.data.lastReviewed);
    const body = stripLanguageCheckComments(parsed.content);
    const html = parsed.data.format === "html" ? body : markdown.render(body);
    entries.push({ filename, ...parsed.data, body, html });
  }
  return entries;
}

function navigationOwner(items, route) {
  // The navigation data decides which section a page belongs to. The URL
  // prefix is only a fallback for pages that no menu lists.
  const listed = items.find((item) => item.href === route || item.items?.some((child) => child.href === route));
  if (listed) return listed;
  const section = route.split("/").filter(Boolean)[0] || "";
  if (!section) return null;
  return items.find((item) => (item.href.split("/").filter(Boolean)[0] || "") === section) || null;
}

function navigationContainsRoute(item, route) {
  if (item.href === route) return true;
  return (item.items || []).some((child) => navigationContainsRoute(child, route));
}

function renderNavigation(items, route, mobile = false) {
  const owner = navigationOwner(items, route);
  return items
    .map((item, index) => {
      const active = item === owner;
      const current = route === item.href ? ' aria-current="page"' : "";
      if (!item.items?.length) {
        return `<li class="${active ? "active" : ""}"><a href="${escapeHtml(item.href)}"${current}>${escapeHtml(item.label)}</a></li>`;
      }
      const submenu = item.items
        .map((child) => {
          const childCurrent = route === child.href ? ' aria-current="page"' : "";
          return `<li${route === child.href ? ' class="active"' : ""}><a href="${escapeHtml(child.href)}"${childCurrent}>${escapeHtml(child.label)}</a></li>`;
        })
        .join("");
      if (mobile) {
        return `<li class="dropdown open ${active ? "active" : ""}"><a href="${escapeHtml(item.href)}"${current}>${escapeHtml(item.label)} <span class="caret"></span></a><ul class="dropdown-menu navmenu-nav">${submenu}</ul></li>`;
      }
      const submenuId = `nav-submenu-${index}`;
      return `<li class="dropdown ${active ? "active" : ""}"><a aria-controls="${submenuId}" aria-expanded="false" aria-haspopup="true" class="dropdown-toggle" data-close-others="true" data-hover="dropdown" data-tritonai-nav-dropdown href="${escapeHtml(item.href)}"${current}>${escapeHtml(item.label)} <span class="caret"></span></a><ul class="dropdown-menu" id="${submenuId}">${submenu}</ul></li>`;
    })
    .join("");
}

function renderSidebarItems(navigation, route) {
  const owner = navigationOwner(navigation, route);
  if (!owner) {
    return navigation
      .map((item) => `<li class="collapsed"><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a></li>`)
      .join("");
  }

  // The canonical sidebar (inherited from the TritonAI site) is contextual after a child page is chosen:
  // it keeps only siblings in view and makes the current page plain active text.
  // A top-level landing page instead remains in the root menu with its section
  // expanded. Do not repeat a child that merely aliases the section landing.
  const children = (owner.items || []).filter((child) => child.href !== owner.href);
  const activeChild = children.find((child) => child.href === route);
  const activeDescendantChild = children.find((child) =>
    child.href !== route && navigationContainsRoute(child, route)
  );
  // A topic with pages of its own nests them under it, as the Decorator
  // two-column template does, so only the current page is highlighted.
  // Listing them at the topic's level made the topic active too, and the
  // highlight landed on the topic instead of the page being read.
  const nestedSidebarLinks = (item) => {
    const pages = (item.items || [])
      .filter((child) => child.href !== item.href)
      .map((child) =>
        child.items?.length && navigationContainsRoute(child, route)
          ? nestedSidebarLinks(child)
          : child.href === route
            ? `<li class="active">${escapeHtml(child.label)}</li>`
            : `<li><a href="${escapeHtml(child.href)}">${escapeHtml(child.label)}</a></li>`
      )
      .join("");
    return item.href === route
      ? `<li class="expanded active">${escapeHtml(item.label)}<ul>${pages}</ul></li>`
      : `<li class="expanded"><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a><ul>${pages}</ul></li>`;
  };
  if (activeChild) {
    return children
      .map((child) => {
        if (child.href === route) {
          if (child.items?.length) return nestedSidebarLinks(child);
          return `<li class="active">${escapeHtml(child.label)}</li>`;
        }
        return `<li><a href="${escapeHtml(child.href)}">${escapeHtml(child.label)}</a></li>`;
      })
      .join("");
  }

  if (activeDescendantChild) {
    return children
      .map((child) => {
        if (child === activeDescendantChild) {
          return nestedSidebarLinks(child);
        }
        return `<li><a href="${escapeHtml(child.href)}">${escapeHtml(child.label)}</a></li>`;
      })
      .join("");
  }

  return navigation
    .map((item) => {
      const isActive = item === owner;
      if (isActive) {
        const submenu = children
          .map((child) => `<li><a href="${escapeHtml(child.href)}">${escapeHtml(child.label)}</a></li>`)
          .join("");
        const classes = submenu ? "expanded active" : "active";
        return `<li class="${classes}">${escapeHtml(item.label)}${submenu ? `<ul>${submenu}</ul>` : ""}</li>`;
      }
      return `<li class="collapsed"><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a></li>`;
    })
    .join("");
}

function renderSidebarInner(navigation, route) {
  const owner = navigationOwner(navigation, route);
  const children = owner ? (owner.items || []).filter((child) => child.href !== owner.href) : [];
  const activeChild = children.find((child) => child.href === route);
  const activeDescendantChild = children.find((child) =>
    child.href !== route && navigationContainsRoute(child, route)
  );
  const heading = (activeChild || activeDescendantChild) && owner
    ? `<a href="${escapeHtml(owner.href)}">${escapeHtml(owner.label)}</a>`
    : `<a href="/index.html">${escapeHtml(site.name)}</a>`;
  return `<h2>${heading}</h2><ul class="navbar-list">${renderSidebarItems(navigation, route)}</ul>`;
}

function renderSidebar(navigation, route) {
  return `<section aria-label="Sidebar" class="col-xs-12 col-md-3 sidebar-section" role="complementary"><article aria-label="Sidebar Nav" class="main-content-nav" role="navigation">${renderSidebarInner(navigation, route)}</article></section>`;
}

function renderSubpageMobileNav(navigation, route) {
  const owner = navigationOwner(navigation, route);
  const label = owner ? owner.label : site.name;
  return `<nav aria-label="${escapeHtml(label)} section navigation" class="about-mobile-section-nav"><details><summary>More in ${escapeHtml(label)}</summary><ul class="navbar-list">${renderSidebarItems(navigation, route)}</ul></details></nav>`;
}

function renderLandingMobileSectionNav(navigation, route) {
  const owner = navigationOwner(navigation, route);
  if (!owner?.items?.length) return "";

  const hasOverview = owner.items.some((item) => item.href === owner.href);
  const items = hasOverview
    ? owner.items
    : [{ label: `${owner.label} Overview`, href: owner.href }, ...owner.items];
  const sectionSlug = owner.href.split("/").filter(Boolean)[0] || "site";
  const headingId = `mobile-section-nav-${sectionSlug}`;
  const links = items
    .map((item) => {
      if (item.href === route) {
        return `<li class="active"><span aria-current="page">${escapeHtml(item.label)}</span></li>`;
      }
      return `<li><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a></li>`;
    })
    .join("");

  return `<nav aria-labelledby="${headingId}" class="landing-mobile-section-nav"><div class="container"><h2 id="${headingId}">More in ${escapeHtml(owner.label)}</h2><ul>${links}</ul></div></nav>`;
}

function routeForRelativePath(relativePath) {
  if (relativePath === "index.html") return "/";
  return `/${relativePath.replaceAll(path.sep, "/")}`;
}

function relativePathForRoute(route) {
  if (route === "/") return "index.html";
  return route.replace(/^\//, "");
}

// Walks the navigation tree so a documentation page three levels deep reads
// Home > Docs > GPU Access > Reservations. A page no menu lists falls back to
// its first path segment.
function navigationTrail(items, route, trail = []) {
  for (const item of items) {
    if (item.href === route) return [...trail, item];
    const found = navigationTrail(item.items || [], route, [...trail, item]);
    if (found) return found;
  }
  return null;
}

function breadcrumbFor(page) {
  if (page.path === "/index.html") return "";
  const home = `<li><a href="/">${escapeHtml(site.name)}</a></li>`;
  const trail = navigationTrail(site.navigation || [], page.path) || [];
  const ancestors = trail.filter((item) => item.href !== page.path && item.href !== "/index.html");
  if (!ancestors.length) {
    const owner = navigationOwner(site.navigation || [], page.path);
    if (owner && owner.href !== page.path) ancestors.push(owner);
  }
  const links = ancestors.map((item) => `<li><a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a></li>`).join("");
  return `${home}${links}<li aria-current="page">${escapeHtml(page.title)}</li>`;
}

function slugify(value) {
  return String(value).toLowerCase().replace(/&amp;|&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// Long documentation pages get an "On this page" list built from their own
// second-level headings, which keeps the sidebar for site navigation.
function renderPageContents(bodyHtml, page) {
  if (page.format !== "html") return "";
  const $ = load(`<div>${bodyHtml}</div>`, { decodeEntities: false }, false);
  const headings = $("h2[id]").toArray();
  if (headings.length < 4) return "";
  const headingId = `on-this-page-${slugify(page.path)}`;
  const links = headings
    .map((heading) => `<li><a href="#${escapeHtml($(heading).attr("id"))}">${escapeHtml($(heading).text().trim())}</a></li>`)
    .join("");
  return `<nav aria-labelledby="${headingId}" class="docs-page-contents"><h2 id="${headingId}">On this page</h2><ol>${links}</ol></nav>`;
}

// Previous and next follow the order of the page's siblings in content/site.json.
function renderSiblingPager(page) {
  const trail = navigationTrail(site.navigation || [], page.path);
  if (!trail || trail.length < 2) return "";
  const parent = trail.at(-2);
  const siblings = (parent.items || []).filter((item) => item.href !== parent.href);
  const index = siblings.findIndex((item) => item.href === page.path);
  if (index < 0) return "";
  const previous = siblings[index - 1];
  const next = siblings[index + 1];
  if (!previous && !next) return "";
  const link = (item, direction) =>
    item
      ? `<li class="${direction}"><a href="${escapeHtml(item.href)}"><span class="docs-pager-direction">${direction === "previous" ? "Previous" : "Next"}</span><span class="docs-pager-title">${escapeHtml(item.label)}</span></a></li>`
      : "";
  return `<nav aria-label="${escapeHtml(parent.label)} pages" class="docs-pager"><ul>${link(previous, "previous")}${link(next, "next")}</ul></nav>`;
}

// The DSMLP documentation carried a draft banner on every page. It stays until
// the content owners clear it by removing `docsStatusNotice` from site.json.
function renderDocsStatus(page) {
  if (page.format !== "html" || !site.docsStatusNotice) return "";
  return `<div class="alert alert-info docs-callout docs-status" role="note"><p class="docs-callout-label"><strong>Draft documentation</strong></p><p>${escapeHtml(site.docsStatusNotice)}</p></div>`;
}

function renderPageHelp(page) {
  if (page.format !== "html") return "";
  return `<aside class="docs-page-help" aria-label="Help with this page"><p><strong>Need help with something on this page?</strong> Email <a href="mailto:${escapeHtml(site.supportEmail)}">${escapeHtml(site.supportEmail)}</a> or see <a href="/support/index.html">Support</a>.</p></aside>`;
}

// content/site.json maps path prefixes to hero art; the longest match wins.
function heroImageFor(route) {
  const normalized = route === "/index.html" ? "/" : route;
  const match = Object.keys(site.heroImages || {})
    .filter((prefix) => (prefix === "/" ? normalized === "/" : normalized === prefix || normalized.startsWith(prefix)))
    .sort((a, b) => b.length - a.length)[0];
  return match ? site.heroImages[match] : null;
}

// The homepage rotator, ported from the TritonAI site's renderHomeHero so the
// two sites share one carousel structure, playback control, and validator.
function renderHomeHero(hero) {
  const multipleSlides = hero.slides.length > 1;
  const indicators = multipleSlides ? hero.slides
    .map(
      (_, index) =>
        `<li aria-hidden="true" class="${index === 0 ? "active" : ""}" data-slide-to="${index}" data-target="#heroslider"></li>`,
    )
    .join("") : "";
  const slides = hero.slides
    .map((slide, index) => {
      const accent = slide.accent ? `<strong>${escapeHtml(slide.accent)}</strong><br>` : "";
      const imageAttributes =
        index === 0
          ? `src="${escapeHtml(slide.image)}" fetchpriority="high"`
          : `src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="${escapeHtml(slide.image)}" loading="lazy"`;
      // Only the first slide paints on load, so only it gets the phone-sized file.
      const heroImage = slide.mobileImage && index === 0
        ? `<picture class="home-hero-media"><source media="(min-width: 768px)" srcset="${escapeHtml(slide.image)}"><img alt="${escapeHtml(slide.imageAlt || "")}" class="first-slide" src="${escapeHtml(slide.mobileImage)}" fetchpriority="high" decoding="async"></picture>`
        : `<img alt="${escapeHtml(slide.imageAlt || "")}" class="first-slide" ${imageAttributes} decoding="async">`;
      return `<div aria-label="${index + 1} out of ${hero.slides.length}" aria-roledescription="slide" aria-hidden="${index === 0 ? "false" : "true"}" class="item${index === 0 ? " active" : ""}" data-home-hero-id="${escapeHtml(slide.id)}" role="group">${heroImage}<div class="container"><div class="cr-item-container"><div class="row"><div class="col-sm-12"><div class="animated fadeInUp herotextbg-dark-opaque"><h2 class="rt-text-light hero-slide-heading" tabindex="${index === 0 ? "0" : "-1"}">${escapeHtml(slide.title)}</h2><p class="rt-text-light" tabindex="${index === 0 ? "0" : "-1"}">${accent}${escapeHtml(slide.description)}</p><a class="btn btn-lg btn-default rt-btn-yellow" data-h1="${escapeHtml(slide.title)}" data-module="hero-homepage" href="${escapeHtml(slide.link)}" role="button" tabindex="${index === 0 ? "0" : "-1"}">${escapeHtml(slide.linkLabel)}</a></div></div></div></div></div></div>`;
    })
    .join("");
  const playbackControl = multipleSlides
    ? `<div id="indicators-container"><button aria-label="carousel is playing, click to pause" data-home-hero-toggle id="toggleCarousel" type="button"><span aria-hidden="true" class="glyphicon glyphicon-pause"></span></button><ol aria-hidden="true" class="carousel-indicators">${indicators}</ol></div>`
    : "";
  const navigationControls = multipleSlides
    ? `<a aria-controls="heroslider" aria-label="previous slide" class="left carousel-control" data-home-hero-direction="prev" data-slide="prev" href="#heroslider" role="button" tabindex="0"><span aria-hidden="true" class="glyphicon glyphicon-chevron-left"></span><span class="sr-only">Previous</span></a><a aria-controls="heroslider" aria-label="next slide" class="right carousel-control" data-home-hero-direction="next" data-slide="next" href="#heroslider" role="button" tabindex="0"><span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span><span class="sr-only">Next</span></a>`
    : "";
  const carouselAttributes = multipleSlides ? ` data-interval="${hero.rotationIntervalMs}" data-ride="carousel"` : "";
  return `<div class="carousel slide jumbotron jumbotron-hero hm"${carouselAttributes} id="heroslider"><div aria-label="${multipleSlides ? `Revolving Banners with ${hero.slides.length} items` : `${escapeHtml(site.name)} introduction`}" class="carousel-inner" role="region" tabindex="0">${playbackControl}${slides}${navigationControls}</div></div>${multipleSlides ? '<script defer src="/_resources/js/home-hero.js"></script>' : ""}`;
}

function renderGeneratedPage(shellHtml, page, bodyHtml) {
  const $ = load(shellHtml, { decodeEntities: false });
  $("body").addClass("agent-page");
  const landingHub = page.landingHub === true;
  // Every generated page that is not a hub gets the subpage treatment the
  // TritonAI site uses for its About pages: an eyebrow over the title, a
  // two-column layout, and a collapsible section menu on phones.
  const subpage = !landingHub;
  if (landingHub) $("body").addClass("landing-hub-page");
  if (subpage) $("body").addClass("about-subpage");
  if (page.format === "html") $("body").addClass("docs-page");
  const bannerImage = page.bannerImage || heroImageFor(page.path) || DEFAULT_BANNER;
  // The hero art keeps its motif on the right, so phones crop toward it.
  const bannerPosition = page.bannerPosition || "80% center";
  const bannerClass = page.bannerMode === "photo" ? "" : " landing-hub-hero--abstract";
  const eyebrow = page.eyebrow ? `<p>${escapeHtml(page.eyebrow)}</p>` : "";
  // A page that opens with a lead summary, and the key-facts row right after
  // it, shows them first, above the draft notice and the contents list.
  const leadMatch = landingHub ? null : bodyHtml.match(/^\s*(<p class="lead">[\s\S]*?<\/p>)(\s*<dl class="docs-glance">[\s\S]*?<\/dl>)?/);
  const subpageLead = leadMatch ? `${leadMatch[1]}${leadMatch[2] || ""}` : "";
  const subpageBody = leadMatch ? bodyHtml.slice(leadMatch[0].length) : bodyHtml;
  // A hub's banner carries only the eyebrow and title. Taglines and framing
  // belong in the page body, where they are not set in yellow capitals.
  const mainContent = page.path === "/index.html"
    ? `${renderHomeHero(homeHero)}<div class="home-main-content"><section aria-label="Main Content" class="col-xs-12 main-section landing-hub-content">${bodyHtml}</section></div>${renderLandingMobileSectionNav(site.navigation, page.path)}`
    : landingHub
    ? `<div class="jumbotron jumbotron-fluid intro-banner landing-hub-hero${bannerClass}" style="background-image:url('${escapeHtml(bannerImage)}');background-position:${escapeHtml(bannerPosition)};"><div class="container"><div class="cr-item-container"><div class="row"><div class="col-sm-12"><div class="landing-hub-title animated fadeInUp">${eyebrow}<h1 class="intro-banner-heading">${escapeHtml(page.title)}</h1></div></div></div></div></div></div><div class="container landing-hub-breadcrumbs"><div class="row"><ol aria-label="Breadcrumb" class="breadcrumb breadcrumbs-list">${breadcrumbFor(page)}</ol></div></div><section aria-label="Main Content" class="col-xs-12 main-section landing-hub-content">${bodyHtml}</section>${renderLandingMobileSectionNav(site.navigation, page.path)}`
    : `<div class="jumbotron jumbotron-fluid intro-banner about-subpage-hero" style="background-image:url('${escapeHtml(bannerImage)}');background-position:${escapeHtml(bannerPosition)};"><div class="container"><div class="about-subpage-title animated fadeInUp">${eyebrow}<h1 class="intro-banner-heading">${escapeHtml(page.title)}</h1></div></div></div><div class="container"><div class="row"><ol aria-label="Breadcrumb" class="breadcrumb breadcrumbs-list">${breadcrumbFor(page)}</ol></div><div class="row about-subpage-layout">${renderSubpageMobileNav(site.navigation, page.path)}<section aria-label="Main Content" class="col-xs-9 main-section pull-right">${subpageLead}${renderDocsStatus(page)}${renderPageContents(subpageBody, page)}${subpageBody}${renderSiblingPager(page)}${renderPageHelp(page)}</section>${renderSidebar(site.navigation, page.path)}</div></div>`;
  $("main#main-content").html(mainContent);
  // Each callout label leads with the Decorator glyphicon for its kind, so a
  // note, a warning, and a tip read differently before the words are read.
  const calloutGlyphs = { "alert-info": "info-sign", "alert-warning": "warning-sign", "alert-success": "ok-sign", "alert-danger": "exclamation-sign" };
  $("main#main-content .docs-callout").each((_, element) => {
    const callout = $(element);
    const kind = Object.keys(calloutGlyphs).find((name) => callout.hasClass(name));
    const label = callout.children(".docs-callout-label").first();
    if (!kind || !label.length || label.find(".glyphicon").length) return;
    label.prepend(`<span aria-hidden="true" class="glyphicon glyphicon-${calloutGlyphs[kind]}"></span>`);
  });
  return $.html();
}

function decodeCloudflareEmail(value) {
  if (!value || value.length < 4) return null;
  const key = Number.parseInt(value.slice(0, 2), 16);
  let result = "";
  for (let index = 2; index < value.length; index += 2) {
    result += String.fromCharCode(Number.parseInt(value.slice(index, index + 2), 16) ^ key);
  }
  return result;
}

function prefixInternalUrl(value, relativePath) {
  if (!value || /^(?:#|mailto:|tel:|javascript:|data:|about:|blob:)/i.test(value) || value.startsWith("//")) return value;
  let candidate = value;
  try {
    const parsed = new URL(value, OFFICIAL_ORIGIN);
    if (/^https?:\/\//i.test(value) && parsed.origin !== OFFICIAL_ORIGIN) return value;
    if (/^https?:\/\//i.test(value) && parsed.origin === OFFICIAL_ORIGIN) {
      candidate = `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
  } catch {
    return value;
  }
  if (SITE_BASE_PATH && !candidate.startsWith("/")) {
    try {
      const resolved = new URL(candidate, `https://local.invalid/${relativePath}`);
      candidate = `${resolved.pathname}${resolved.search}${resolved.hash}`;
    } catch {
      return value;
    }
  }
  if (!candidate.startsWith("/") || !SITE_BASE_PATH) return candidate;
  if (candidate === SITE_BASE_PATH || candidate.startsWith(`${SITE_BASE_PATH}/`)) return candidate;
  return `${SITE_BASE_PATH}${candidate}`;
}

function prefixInlineStyleUrls(value, relativePath) {
  if (!value || !SITE_BASE_PATH || !/url\(/i.test(value)) return value;
  return value.replace(/url\((['"]?)([^'")]+)\1\)/gi, (_, quote, url) => {
    const rewritten = prefixInternalUrl(url, relativePath);
    const delimiter = quote || "'";
    return `url(${delimiter}${rewritten}${delimiter})`;
  });
}

function upsertMeta($, selector, attributes) {
  let element = $(selector).first();
  if (!element.length) {
    element = $("<meta>");
    $("head").append(element);
  }
  element.attr(attributes);
}

function breadcrumbSchema($, canonicalUrl) {
  const items = $("ol[aria-label='Breadcrumb'] li")
    .toArray()
    .map((element, index, elements) => {
      const item = $(element);
      const link = item.find("a[href]").first();
      const name = item.text().replace(/\s+/g, " ").trim();
      if (!name) return null;
      const entry = {
        "@type": "ListItem",
        position: index + 1,
        name,
      };
      if (link.length) entry.item = new URL(link.attr("href"), OFFICIAL_ORIGIN).href;
      else if (index === elements.length - 1) entry.item = canonicalUrl;
      return entry;
    })
    .filter(Boolean);
  if (items.length < 2) return null;
  return {
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

function localAssetPath(value, relativePath) {
  if (!value || /^(?:data:|https?:|\/\/|#)/i.test(value)) return null;
  try {
    return new URL(value, `https://local.invalid/${relativePath}`).pathname;
  } catch {
    return null;
  }
}

function optimizedImageFor(value, relativePath, optimizedImages) {
  const localPath = localAssetPath(value, relativePath);
  if (!localPath || !/\.(?:jpe?g|png)$/i.test(localPath)) return null;
  const optimizedPath = localPath.replace(/\.(?:jpe?g|png)$/i, ".webp");
  if (!optimizedImages.has(optimizedPath)) return null;
  return value.replace(/\.(?:jpe?g|png)(?=$|[?#])/i, ".webp");
}

function optimizeLocalImages($, relativePath, optimizedImages) {
  $("img[src]").each((_, element) => {
    const image = $(element);
    if (image.hasClass("first-slide")) return;
    const source = image.attr("src");
    if (!localAssetPath(source, relativePath)) return;
    image.attr("loading", "lazy").attr("decoding", "async");
    if (image.parent("picture").length) return;
    const optimized = optimizedImageFor(source, relativePath, optimizedImages);
    if (!optimized) return;
    image.wrap('<picture class="tritonai-optimized-image"></picture>');
    image.before(`<source srcset="${escapeHtml(optimized)}" type="image/webp">`);
  });

  $("[style*='background-image']").each((_, element) => {
    const target = $(element);
    const style = target.attr("style") || "";
    const match = style.match(/background-image\s*:\s*url\((['\"]?)([^'\")]+)\1\)\s*;?/i);
    if (!match) return;
    const optimized = optimizedImageFor(match[2], relativePath, optimizedImages);
    if (!optimized) return;
    const fallbackDeclaration = `background-image:url('${match[2]}');`;
    const fallbackType = /\.png(?:$|[?#])/i.test(match[2]) ? "png" : "jpeg";
    const optimizedDeclaration = `background-image:image-set(url('${optimized}') type('image/webp'), url('${match[2]}') type('image/${fallbackType}'));`;
    target.attr("style", style.replace(match[0], `${fallbackDeclaration}${optimizedDeclaration}`));
  });
}

function applyGoogleAnalytics($) {
  $("script[src*='googletagmanager.com']").remove();
  $("script:not([src])").each((_, element) => {
    if (/gtag\s*\(/.test($(element).html() || "")) $(element).remove();
  });
  if (!GOOGLE_ANALYTICS_ID) return;
  $("head").append(
    `<script async data-tritonai-analytics src="https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}"></script>` +
      `<script data-tritonai-analytics>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GOOGLE_ANALYTICS_ID}',{'cookie_domain':'${GOOGLE_ANALYTICS_COOKIE_DOMAIN}'});</script>`,
  );
}

function applyFavicon($) {
  $("link[rel~='icon'], link[rel='shortcut icon'], link[rel='apple-touch-icon']").remove();
  $("head").prepend('<link rel="icon" href="/favicon.ico">');
}

function optimizeScriptLoading($) {
  $("script[src]").each((_, element) => {
    const script = $(element);
    const source = script.attr("src") || "";
    if (AFTER_RENDER_SCRIPTS.has(source) || /(?:^|\/)datatables\.min\.js(?:[?#]|$)/i.test(source)) {
      script.attr("data-after-render-src", source).attr("type", "application/x-tritonai-after-render-script").removeAttr("src");
    } else if (source === EMERGENCY_BROADCAST_SCRIPT) {
      script.attr("async", "");
    } else if (source === TRITONGPT_WIDGET_SCRIPT) {
      script.attr("data-idle-src", source).attr("type", "application/x-tritonai-idle-script").removeAttr("src");
    }
  });

  $("script:not([src])").each((_, element) => {
    const script = $(element);
    if (script.attr("type") && script.attr("type") !== "text/javascript") return;
    const source = script.html() || "";
    if (!/\$\(document\)\.ready|initCopyright\(\)/.test(source)) return;
    const guardedSource = source
      .replace("$('.js-activated').dropdownHover().dropdown();", "if (window.jQuery && jQuery.fn.dropdownHover && jQuery.fn.dropdown) $('.js-activated').dropdownHover().dropdown();")
      .replace("initCopyright();", "if (typeof initCopyright === 'function') initCopyright();");
    script.attr("type", "application/x-tritonai-after-render-inline");
    script.html(`if (window.jQuery) {\n${guardedSource}\n}`);
  });
}

function normalizeRemoteAssetProtocols($) {
  const remoteAssetAttributes = [
    ["link[rel~='stylesheet'][href^='//cdn.ucsd.edu/']", "href"],
    ["script[src^='//cdn.ucsd.edu/']", "src"],
    ["img[src^='//cdn.ucsd.edu/']", "src"],
    ["source[src^='//cdn.ucsd.edu/']", "src"],
  ];
  for (const [selector, attribute] of remoteAssetAttributes) {
    $(selector).each((_, element) => {
      const asset = $(element);
      asset.attr(attribute, `https:${asset.attr(attribute)}`);
    });
  }
}

function normalizeNavigationMarkup($) {
  $(".skip-to-main").removeAttr("tabindex");
  $("[autofocus]").removeAttr("autofocus");

  const mobileNavigation = $(".navmenu.navmenu-default.navmenu-fixed-left.offcanvas").not(".offcanvas-clone").first();
  if (mobileNavigation.length) {
    mobileNavigation.attr({ id: "mobile-navigation", "aria-hidden": "true", "aria-label": "Site navigation" });
    mobileNavigation.find(".navbar-toggle[data-toggle='offcanvas']").attr({
      "aria-controls": "mobile-navigation",
      "aria-label": "Close navigation",
      "data-tritonai-mobile-close": "",
    });
  }

  const mobileToggle = $("nav.navbar .navbar-toggle[data-toggle='offcanvas']").first();
  if (mobileToggle.length) {
    mobileToggle.attr({
      "aria-controls": "mobile-navigation",
      "aria-expanded": "false",
      "data-tritonai-mobile-toggle": "",
    });
  }

  $("form").each((_, element) => {
    const form = $(element);
    const scope = form.find("select.search-scope").first();
    const term = form.find("input.search-term").first();
    if (!scope.length || !term.length) return;
    const mobile = form.closest(".navmenu").length > 0;
    const suffix = mobile ? "mobile" : "desktop";
    const scopeId = `search-scope-${suffix}`;
    const termId = `search-term-${suffix}`;
    scope.attr("id", scopeId);
    term.attr("id", termId);
    form.find("label[for]").remove();
    scope.before(`<label class="sr-only" for="${scopeId}">Search scope</label>`);
    term.before(`<label class="sr-only" for="${termId}">Search term</label>`);
  });

  const desktopSearch = $("nav.navbar .search").first();
  if (desktopSearch.length) {
    const toggle = desktopSearch.find(".search-toggle").first();
    const panel = desktopSearch.find(".search-content").first();
    if (toggle.length && panel.length) {
      const panelId = panel.attr("id") || "search";
      panel.attr({ id: panelId, "aria-hidden": "true" });
      toggle.attr({
        "aria-controls": panelId,
        "aria-expanded": "false",
        "data-tritonai-search-toggle": "",
      });
    }
  }
}


function transformHtml(html, relativePath, context) {
  const $ = load(html, { decodeEntities: false });
  const route = routeForRelativePath(relativePath);
  $("body").addClass("agent-page");
  const generated = context.generatedByPath.get(relativePath);
  const seo = context.seo.routes[route] || {};
  const title = seo.title || generated?.title || $("meta[name='PAGETITLE']").attr("content") || $("title").text().trim() || context.site.name;
  const description = seo.description || generated?.description || $("meta[name='DESCRIPTION']").attr("content") || context.site.description;
  const canonicalPath = generated?.canonicalUrl || seo.canonicalUrl || route;
  const canonicalUrl = new URL(canonicalPath, OFFICIAL_ORIGIN).href;
  const socialImagePath = seo.socialImage || generated?.socialImage || generated?.bannerImage || context.seo.defaultSocialImage;
  const socialImageUrl = new URL(socialImagePath, OFFICIAL_ORIGIN).href;
  const socialImageAlt = seo.socialImageAlt || generated?.imageAlt || context.seo.defaultSocialImageAlt;

  $("title").text(title === context.site.name ? title : `${title} | ${context.site.name}`);
  upsertMeta($, "meta[name='description'], meta[name='DESCRIPTION']", { name: "description", content: description });
  upsertMeta($, "meta[name='PAGETITLE']", { name: "PAGETITLE", content: title });
  upsertMeta($, "meta[property='og:title']", { property: "og:title", content: title });
  upsertMeta($, "meta[property='og:description']", { property: "og:description", content: description });
  upsertMeta($, "meta[property='og:type']", { property: "og:type", content: "website" });
  upsertMeta($, "meta[property='og:url']", { property: "og:url", content: canonicalUrl });
  upsertMeta($, "meta[property='og:site_name']", { property: "og:site_name", content: context.site.name });
  upsertMeta($, "meta[property='og:image']", { property: "og:image", content: socialImageUrl });
  upsertMeta($, "meta[property='og:image:alt']", { property: "og:image:alt", content: socialImageAlt });
  upsertMeta($, "meta[name='twitter:card']", { name: "twitter:card", content: "summary_large_image" });
  upsertMeta($, "meta[name='twitter:title']", { name: "twitter:title", content: title });
  upsertMeta($, "meta[name='twitter:description']", { name: "twitter:description", content: description });
  upsertMeta($, "meta[name='twitter:image']", { name: "twitter:image", content: socialImageUrl });
  upsertMeta($, "meta[name='twitter:image:alt']", { name: "twitter:image:alt", content: socialImageAlt });
  upsertMeta($, "meta[name='robots']", { name: "robots", content: seo.robots || "index,follow" });
  if (relativePath === "404.html") upsertMeta($, "meta[name='robots']", { name: "robots", content: "noindex,follow" });
  // The review build is served from a public GitHub Pages URL. noindex keeps it
  // out of search results; applied last so nothing above re-enables indexing.
  if (!IS_PRODUCTION_BUILD) {
    upsertMeta($, "meta[name='robots']", { name: "robots", content: "noindex,nofollow" });
  }
  $("link[rel='canonical']").remove();
  $("head").append(`<link rel="canonical" href="${escapeHtml(canonicalUrl)}">`);
  if (generated?.redirectTo) {
    const redirectTarget = prefixInternalUrl(generated.redirectTo, relativePath);
    $("meta[http-equiv='refresh']").remove();
    $("head").append(`<meta http-equiv="refresh" content="0; url=${escapeHtml(redirectTarget)}">`);
    upsertMeta($, "meta[name='robots']", { name: "robots", content: "noindex,follow" });
  }
  $("head").append(`<link rel="stylesheet" href="/_resources/css/agent-site.css?v=${AGENT_SITE_CSS_VERSION}">`);
  if (
    $("body").hasClass("landing-hub-page")
    || $("body").hasClass("about-subpage")
    || $("main#main-content").find(".hub-full-bleed").length
  ) {
    $("head").append(`<link rel="stylesheet" href="/_resources/css/landing-hubs.css?v=${LANDING_HUBS_CSS_VERSION}">`);
  }
  $("head").append(`<link rel="stylesheet" href="/_resources/css/parasol.css?v=${PARASOL_CSS_VERSION}">`);
  const connectionHints = PRECONNECT_ORIGINS.map(
    (origin) => `<link rel="preconnect" href="${origin}" crossorigin><link rel="dns-prefetch" href="//${new URL(origin).host}">`,
  ).join("");
  $("head").prepend(`${connectionHints}<script data-tritonai-js-class>document.documentElement.className=document.documentElement.className.replace(/\\bno-js\\b/g,'js');</script>`);
  $("script[data-tritonai-schema]").remove();
  const websiteId = `${OFFICIAL_ORIGIN}/#website`;
  const organizationId = `${OFFICIAL_ORIGIN}/#organization`;
  const isWebsite = relativePath === "index.html";
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": isWebsite ? "WebSite" : generated?.format === "html" ? "TechArticle" : "WebPage",
    "@id": isWebsite ? websiteId : `${canonicalUrl}#webpage`,
    name: isWebsite ? context.site.name : title,
    description,
    url: canonicalUrl,
    image: socialImageUrl,
    inLanguage: "en-US",
    publisher: { "@id": organizationId },
    dateModified: seo.lastModified || generated?.lastReviewed || context.site.lastReviewed,
  };
  if (isWebsite) pageSchema.alternateName = context.site.alternateNames;
  else pageSchema.isPartOf = { "@type": "WebSite", "@id": websiteId, name: context.site.name, url: OFFICIAL_ORIGIN };
  const organizationSchema = isWebsite
    ? {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": organizationId,
        name: "University of California San Diego",
        alternateName: ["UC San Diego", "UCSD"],
        url: "https://ucsd.edu/",
      }
    : null;
  const breadcrumb = breadcrumbSchema($, canonicalUrl);
  const schemaNodes = [pageSchema];
  if (organizationSchema) schemaNodes.push(organizationSchema);
  if (breadcrumb) schemaNodes.push({ "@context": "https://schema.org", ...breadcrumb });
  const schema = JSON.stringify(schemaNodes.length > 1 ? schemaNodes : pageSchema)
    .replaceAll("</script", "<\\/script");
  $("head").append(`<script type="application/ld+json" data-tritonai-schema>${schema}</script>`);
  applyGoogleAnalytics($);
  applyFavicon($);

  $(".navbar-nav-list").first().html(renderNavigation(context.site.navigation, route, false));
  $("ul.nav.navmenu-nav").first().html(renderNavigation(context.site.navigation, route, true));
  $("article.main-content-nav").each((_, element) => {
    $(element).html(renderSidebarInner(context.site.navigation, route));
  });
  normalizeNavigationMarkup($);

  // Code samples and wide tables scroll sideways on a phone. A keyboard user
  // has to be able to focus the scrolling box to scroll it.
  $("main#main-content table").each((_, element) => {
    const table = $(element);
    table.addClass("table table-striped");
    if (!table.parent(".table-responsive").length) table.wrap('<div class="table-responsive"></div>');
  });
  $("main#main-content pre").attr("tabindex", "0");
  $("main#main-content .table-responsive").each((_, element) => {
    const wrapper = $(element);
    const heading = wrapper.prevAll("h2, h3, h4").first().text().trim()
      || wrapper.closest("section").find("h2, h3").first().text().trim();
    wrapper.attr({ tabindex: "0", role: "region", "aria-label": heading ? `${heading} table` : "Table" });
  });

  optimizeLocalImages($, relativePath, context.optimizedImages);
  normalizeRemoteAssetProtocols($);
  optimizeScriptLoading($);
  if (!$("script[src$='site-navigation.js']").length) $("body").append('<script defer src="/_resources/js/site-navigation.js"></script>');
  if ($(".drawer").length && !$("script[src$='site-drawers.js']").length) {
    $("body").append('<script defer src="/_resources/js/site-drawers.js"></script>');
  }
  if ($("[data-parasol-search]").length && !$("script[src$='site-search.js']").length) {
    $("body").append('<script defer src="/_resources/js/site-search.js"></script>');
  }
  if (!$("script[src$='webmcp.js']").length) $("body").append('<script defer src="/_resources/js/webmcp.js"></script>');
  if (!$("script[src$='site-performance.js']").length) $("body").append('<script defer src="/_resources/js/site-performance.js"></script>');

  $("a[href]").each((_, element) => {
    const anchor = $(element);
    const href = anchor.attr("href") || "";
    if (anchor.attr("data-same-tab") !== undefined) {
      anchor.removeAttr("target").removeAttr("rel");
      return;
    }
    if (/^https?:\/\//i.test(href) && new URL(href).origin !== OFFICIAL_ORIGIN) {
      anchor.attr("target", "_blank").attr("rel", "noopener noreferrer");
      // Accessibility standard: a link that opens a new window says so. Only
      // canvas links are annotated; the shell's footer links are chrome.
      if (anchor.closest("main#main-content").length && !anchor.find(".sr-only.new-window").length && !/opens in new window/i.test(anchor.attr("aria-label") || "")) {
        anchor.append('<span class="sr-only new-window"> (opens in new window)</span>');
      }
    }
  });

  for (const attr of ["href", "src", "action", "poster", "data-src", "data-poster", "data-fallback-src", "data-after-render-src", "data-idle-src", "data-search-index"]) {
    $(`[${attr}]`).each((_, element) => {
      if (attr === "href" && element.tagName === "link" && $(element).attr("rel") === "canonical") return;
      $(element).attr(attr, prefixInternalUrl($(element).attr(attr), relativePath));
    });
  }
  $("[style*='url(']").each((_, element) => {
    const target = $(element);
    target.attr("style", prefixInlineStyleUrls(target.attr("style") || "", relativePath));
  });
  $("[srcset]").each((_, element) => {
    const rewritten = ($(element).attr("srcset") || "")
      .split(",")
      .map((candidate) => {
        const parts = candidate.trim().split(/\s+/);
        parts[0] = prefixInternalUrl(parts[0], relativePath);
        return parts.join(" ");
      })
      .join(", ");
    $(element).attr("srcset", rewritten);
  });

  return $.html();
}

async function listFiles(directory, base = directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await listFiles(absolute, base)));
    else files.push(path.relative(base, absolute));
  }
  return files;
}

async function writeGeneratedPage(shellHtml, page, bodyHtml, generatedByPath) {
  const relativePath = relativePathForRoute(page.path);
  const filename = path.join(OUTPUT_DIR, relativePath);
  await mkdir(path.dirname(filename), { recursive: true });
  await writeFile(filename, renderGeneratedPage(shellHtml, page, bodyHtml));
  generatedByPath.set(relativePath, page);
}

// The site search reads this index in the browser. It holds the same public
// text the pages render, split by second-level section so a hit can link to
// the heading it matched.
function searchIndexFor(page) {
  const $ = load(`<div>${page.html}</div>`, { decodeEntities: true }, false);
  $("pre, script, style, nav").remove();
  const sections = [];
  let current = { anchor: "", heading: page.title, text: [] };
  $("div").first().children().each((_, element) => {
    const node = $(element);
    if (element.tagName === "h2" && node.attr("id")) {
      sections.push(current);
      current = { anchor: node.attr("id"), heading: node.text().trim(), text: [] };
      return;
    }
    current.text.push(node.text());
  });
  sections.push(current);
  return sections
    .map((section) => ({
      title: page.title,
      section: section.heading,
      url: `${page.path}${section.anchor ? `#${section.anchor}` : ""}`,
      eyebrow: page.eyebrow || "",
      text: section.text.join(" ").replace(/\s+/g, " ").trim(),
    }))
    .filter((entry) => entry.text || entry.section === page.title);
}

const seo = await readJson(SEO_FILE);
const facts = await readJson(FACTS_FILE);
const redirects = await readJson(REDIRECTS_FILE);
const homeHero = await readJson(HOME_HERO_FILE);
requireFields(homeHero, ["schemaVersion", "owner", "source", "lastReviewed", "rotationIntervalMs", "slides"], "content/home/hero.json");
homeHero.lastReviewed = isoDate(homeHero.lastReviewed);
for (const [index, slide] of homeHero.slides.entries()) {
  requireFields(slide, ["id", "title", "description", "image", "link", "linkLabel"], `homepage hero slide ${index + 1}`);
}
requireFields(site, ["name", "origin", "description", "lastReviewed", "supportEmail", "navigation"], "content/site.json");
site.lastReviewed = isoDate(site.lastReviewed);
requireFields(seo, ["schemaVersion", "defaultSocialImage", "defaultSocialImageAlt", "routes"], "content/seo.json");
for (const [route, entry] of Object.entries(seo.routes)) {
  if (!route.startsWith("/")) throw new Error(`content/seo.json route must start with /: ${route}`);
  if (entry.lastModified) entry.lastModified = isoDate(entry.lastModified);
}
for (const fact of facts.facts) {
  requireFields(fact, ["id", "claim", "status", "owner", "lastReviewed", "source", "canonicalUrl"], `public fact ${fact.id || "unknown"}`);
  fact.lastReviewed = isoDate(fact.lastReviewed);
}
requireFields(redirects, ["schemaVersion", "redirects"], "content/redirects/dsmlp-docs.json");

const pages = await loadMarkdownDirectory(PAGE_DIR, ["title", "path", "description", "lastReviewed", "audiences", "source", "canonicalUrl"]);
const pagePaths = new Set();
for (const page of pages) {
  if (pagePaths.has(page.path)) throw new Error(`Two content pages claim ${page.path}`);
  pagePaths.add(page.path);
}
const redirectTargets = redirects.redirects.filter((entry) => !pagePaths.has(entry.to) && entry.to !== "/search/index.html");
if (redirectTargets.length) throw new Error(`Redirect map points at routes no page renders: ${redirectTargets.map((entry) => entry.to).join(", ")}`);
// Generated pages can live at any directory depth, so parent-relative asset
// references in the shell must be site-absolute before reuse.
const shellHtml = (await readFile(SHELL_FILE, "utf8")).replaceAll('src="../_resources/', 'src="/_resources/');

// Empty dist/ rather than deleting it. In an iCloud-synced checkout the folder
// carries an attribute that keeps it out of sync, and recreating it drops that.
await mkdir(OUTPUT_DIR, { recursive: true });
for (const entry of await readdir(OUTPUT_DIR)) {
  await rm(path.join(OUTPUT_DIR, entry), { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}
await cp(SOURCE_DIR, OUTPUT_DIR, { recursive: true, filter: (source) => path.basename(source) !== "_shell.html" });

const generatedByPath = new Map();
for (const page of pages) {
  await writeGeneratedPage(shellHtml, page, page.html, generatedByPath);
}

await writeGeneratedPage(
  shellHtml,
  {
    title: "Search",
    path: "/search/index.html",
    description: `Search the ${site.name} site, or every UC San Diego site.`,
    eyebrow: site.name,
    lastReviewed: site.lastReviewed,
    canonicalUrl: "/search/index.html",
  },
  `<div class="parasol-search" data-parasol-search data-search-index="/_data/search-index.json" data-site-scope="parasol"><p class="lead">Results for this site come from every page of ${escapeHtml(site.name)}. Choose <strong>All UCSD Sites</strong> in the search box to search campus-wide.</p><div id="result-count-placeholder" aria-live="polite"></div><div class="results" id="results"><div id="re"><div id="result-list-placeholder"></div></div><div id="result-pagination-placeholder"></div></div><noscript><p>Search needs JavaScript. Browse the <a href="/docs/index.html">documentation</a> instead.</p></noscript></div><link rel="stylesheet" href="https://cdn.ucsd.edu/cms/search/css/search.css"><script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.10/handlebars.runtime.min.js"></script><script src="https://cdn.ucsd.edu/cms/search/js/templates.js"></script><script src="https://cdn.ucsd.edu/cms/search/js/search-api.js"></script>`,
  generatedByPath,
);
await writeGeneratedPage(
  shellHtml,
  {
    title: "Page Not Found",
    path: "/404.html",
    description: `We could not find that ${site.name} page.`,
    eyebrow: "404",
    lastReviewed: site.lastReviewed,
    canonicalUrl: "/404.html",
  },
  `<p class="lead">The page may have moved, or the address may be incomplete. Pages from the old DSMLP documentation now live in the <a href="/docs/index.html">${escapeHtml(site.name)} documentation</a>.</p><p><a class="btn btn-primary" href="/">Go to the ${escapeHtml(site.name)} home page</a> <a class="btn btn-default" href="/search/index.html">Search the site</a></p>`,
  generatedByPath,
);

let htmlFiles = (await listFiles(OUTPUT_DIR)).filter((file) => file.endsWith(".html"));
const optimizedImages = new Set(
  (await listFiles(path.join(SOURCE_DIR, "_images")))
    .filter((file) => file.endsWith(".webp"))
    .map((file) => `/_images/${file.replaceAll(path.sep, "/")}`),
);
const context = { site, seo, facts, generatedByPath, optimizedImages };
for (const relativePath of htmlFiles) {
  const filename = path.join(OUTPUT_DIR, relativePath);
  await writeFile(filename, transformHtml(await readFile(filename, "utf8"), relativePath, context));
}

htmlFiles = (await listFiles(OUTPUT_DIR)).filter((file) => file.endsWith(".html")).sort();
const routes = htmlFiles
  .map((relativePath) => ({
    path: routeForRelativePath(relativePath),
    canonicalUrl: new URL(generatedByPath.get(relativePath)?.canonicalUrl || seo.routes[routeForRelativePath(relativePath)]?.canonicalUrl || routeForRelativePath(relativePath), OFFICIAL_ORIGIN).href,
    redirectTo: generatedByPath.get(relativePath)?.redirectTo || null,
    source: generatedByPath.has(relativePath) ? "structured-content" : "static",
    lastModified: seo.routes[routeForRelativePath(relativePath)]?.lastModified || generatedByPath.get(relativePath)?.lastReviewed || site.lastReviewed,
    indexable: relativePath !== "404.html"
      && !generatedByPath.get(relativePath)?.redirectTo
      && !/noindex/i.test(seo.routes[routeForRelativePath(relativePath)]?.robots || ""),
  }))
  .filter((route) => !UNLISTED_ROUTES.has(route.path));
const sitemapEntries = routes
  .filter((route) => route.indexable)
  .map((route) => `<url><loc>${escapeHtml(route.canonicalUrl)}</loc><lastmod>${escapeHtml(route.lastModified)}</lastmod></url>`)
  .join("");
await mkdir(path.join(OUTPUT_DIR, "_data"), { recursive: true });
await writeFile(path.join(OUTPUT_DIR, "_data/routes.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), routes }, null, 2)}\n`);
await writeFile(path.join(OUTPUT_DIR, "_data/redirects.json"), `${JSON.stringify(redirects, null, 2)}\n`);
await writeFile(path.join(OUTPUT_DIR, "_data/search-index.json"), `${JSON.stringify(pages.flatMap(searchIndexFor))}\n`);
await writeFile(
  path.join(OUTPUT_DIR, "_data/public-content.json"),
  `${JSON.stringify(
    {
      schemaVersion: 1,
      generatedAt: new Date().toISOString(),
      lastReviewed: site.lastReviewed,
      facts: facts.facts.filter((fact) => fact.status === "public"),
    },
    null,
    2,
  )}\n`,
);
await writeFile(path.join(OUTPUT_DIR, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapEntries}</urlset>\n`);
// The review build still allows crawling so a crawler can read each page's
// noindex; Disallow would leave the URLs listed as bare links. It must not
// advertise the production sitemap either.
await writeFile(
  path.join(OUTPUT_DIR, "robots.txt"),
  IS_PRODUCTION_BUILD
    ? `User-agent: *\nAllow: /\nSitemap: ${OFFICIAL_ORIGIN}/sitemap.xml\n`
    : `# Review build. Every page carries <meta name="robots" content="noindex,nofollow">.\n# Crawling stays allowed so that directive can be read.\nUser-agent: *\nAllow: /\n`,
);
await writeFile(path.join(OUTPUT_DIR, ".nojekyll"), "");

process.stdout.write(`Built ${htmlFiles.length} HTML files (${pages.length} content pages) and ${redirects.redirects.length} DSMLP redirects for base path ${SITE_BASE_PATH || "/"}.\n`);
