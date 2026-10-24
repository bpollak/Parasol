import { access, mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";
import matter from "gray-matter";
import {
  checkCrossPageConsistency,
  checkGoldenFingerprint,
  checkStructuralRules,
  extractChrome,
  foldByRule,
  formatFindings,
  loadChromeContract,
  loadChromeSelectors,
  regionElements,
} from "./lib/chrome-contract.mjs";
import { collectTokens } from "./lib/chrome-styling.mjs";
import { collectStyling } from "./chrome-contract.mjs";

// The PARASOL release gate. It inherits the TritonAI website's checks for the
// Decorator shell, navigation, metadata, accessibility, and performance, and
// adds the ones a documentation site needs: every in-page fragment resolves,
// every old DSMLP address has a destination, and the brand rename did not
// leak into code samples or out of prose.

const DIST_DIR = path.resolve("dist");
const REPORT_DIR = path.resolve("reports");
const CONTENT_DIR = path.resolve("content");
const SITE_BASE_PATH = (process.env.SITE_BASE_PATH || "").replace(/^\/+|\/+$/g, "");
const OFFLINE = process.env.VALIDATE_OFFLINE === "1";
const siteContent = JSON.parse(await readFile(path.join(CONTENT_DIR, "site.json"), "utf8"));
const seoContent = JSON.parse(await readFile(path.join(CONTENT_DIR, "seo.json"), "utf8"));
const factsContent = JSON.parse(await readFile(path.join(CONTENT_DIR, "facts/public-facts.json"), "utf8"));
const redirectContent = JSON.parse(await readFile(path.join(CONTENT_DIR, "redirects/dsmlp-docs.json"), "utf8"));
const homeHeroContent = JSON.parse(await readFile(path.join(CONTENT_DIR, "home/hero.json"), "utf8"));
const OFFICIAL_ORIGIN = siteContent.origin;
const requiredRemoteDependencies = [
  "https://cdn.ucsd.edu/cms/decorator-5/styles/bootstrap.min.css",
  "https://cdn.ucsd.edu/cms/decorator-5/styles/base.min.css",
  "https://cdn.ucsd.edu/cms/decorator-5/scripts/base.min.js",
  "https://www.ucsd.edu/common/_emergency-broadcast/message.js",
  "https://cdn.ucsd.edu/cms/search/js/search-api.js",
  "https://cdn.ucsd.edu/tritongpt/widget/js/tgpt-loader.js",
];
const preconnectOrigins = ["https://cdn.ucsd.edu", "https://www.ucsd.edu", "https://fonts.googleapis.com", "https://fonts.gstatic.com"];
const afterRenderDecoratorScripts = [
  "https://cdn.ucsd.edu/cms/decorator-5/scripts/modernizr.min.js",
  "https://cdn.ucsd.edu/cms/decorator-5/scripts/jquery.min.js",
  "https://cdn.ucsd.edu/cms/decorator-5/scripts/bootstrap.min.js",
  "https://cdn.ucsd.edu/cms/decorator-5/scripts/vendor.min.js",
  "https://cdn.ucsd.edu/cms/decorator-5/scripts/base.min.js",
  "https://cdn.ucsd.edu/cms/decorator-5/scripts/decorator.js",
];
const requiredDecoratorStylesheets = [
  "https://cdn.ucsd.edu/cms/decorator-5/styles/bootstrap.min.css",
  "https://cdn.ucsd.edu/cms/decorator-5/styles/base.min.css",
];
const emergencyBroadcastScript = "https://www.ucsd.edu/common/_emergency-broadcast/message.js";
const tritonGptWidgetScript = "https://cdn.ucsd.edu/tritongpt/widget/js/tgpt-loader.js";
const googleAnalyticsId = siteContent.analytics?.googleAnalyticsId || null;
const imageBudgetBytes = 320_000;
const brand = siteContent.name;
// Prose names the platform PARASOL. The old name may appear only where it is
// literal: hostnames, commands, system output, or text explaining the rename.
const legacyNameAllowedRoutes = new Set(["/about/from-dsmlp-to-parasol.html", "/docs/reference/glossary.html"]);

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

async function exists(filename) {
  try {
    await access(filename);
    return true;
  } catch {
    return false;
  }
}

function isoDate(value) {
  const date = value instanceof Date ? value : new Date(`${value}T12:00:00Z`);
  return Number.isNaN(date.valueOf()) ? null : date.toISOString().slice(0, 10);
}

function normalizeRoute(route) {
  return route === "/index.html" ? "/" : route;
}

function navigationOwner(items, route) {
  const listed = items.find((item) => item.href === route || item.items?.some((child) => child.href === route));
  if (listed) return listed;
  const section = route.split("/").filter(Boolean)[0] || "";
  if (!section) return null;
  return items.find((item) => (item.href.split("/").filter(Boolean)[0] || "") === section) || null;
}

function flattenNavigation(items, depth = 0, parent = null) {
  return items.flatMap((item) => [{ ...item, depth, parent }, ...flattenNavigation(item.items || [], depth + 1, item)]);
}

function missingFields(object, fields) {
  return fields.filter((field) => object[field] === undefined || object[field] === null || object[field] === "");
}

function toLocalUrl(raw, pagePath) {
  if (!raw || /^(?:mailto:|tel:|javascript:|data:)/i.test(raw) || raw.startsWith("//")) return null;
  let url;
  try {
    url = new URL(raw, `https://local.invalid/${pagePath}`);
  } catch {
    return null;
  }
  if (url.origin !== "https://local.invalid") return null;
  let pathname = decodeURIComponent(url.pathname);
  if (SITE_BASE_PATH && pathname.startsWith(`/${SITE_BASE_PATH}/`)) {
    pathname = pathname.slice(SITE_BASE_PATH.length + 1) || "/";
  }
  return { pathname, hash: decodeURIComponent(url.hash.slice(1)) };
}

function relativeFileForPath(pathname) {
  const clean = pathname.replace(/^\//, "");
  if (!clean || pathname.endsWith("/")) return path.join(clean, "index.html");
  return clean;
}

async function resolveLocalTarget(pathname) {
  const clean = pathname.replace(/^\//, "");
  const candidates = [];
  if (!clean || pathname.endsWith("/")) candidates.push(path.join(DIST_DIR, clean, "index.html"));
  else {
    candidates.push(path.join(DIST_DIR, clean));
    if (!path.extname(clean)) candidates.push(path.join(DIST_DIR, clean, "index.html"));
  }
  for (const candidate of candidates) if (await exists(candidate)) return true;
  return false;
}

async function localAssetSize(raw, pagePath) {
  const target = toLocalUrl(raw, pagePath);
  if (!target) return null;
  try {
    return (await stat(path.join(DIST_DIR, target.pathname.replace(/^\//, "")))).size;
  } catch {
    return null;
  }
}

const files = await listFiles(DIST_DIR);
const htmlFiles = files.filter((file) => file.endsWith(".html")).sort();
const missing = [];
const brokenFragments = [];
const accessibility = [];
const metadata = [];
const metadataTitles = new Map();
const performance = [];
const navigation = [];
const decorator = [];
const analytics = [];
const webMcp = [];
const brandFindings = [];
const contentFindings = [];
const freshnessWarnings = [];
const freshnessFailures = [];
const chrome = [];
const chromeByRoute = new Map();
const chromeTokens = new Set();
const canvasTokens = new Set();
const { rules: chromeSelectorRules, expired: expiredChromeExceptions } = await loadChromeSelectors();
chrome.push(...expiredChromeExceptions);

// Content contracts

for (const field of missingFields(siteContent, ["name", "origin", "description", "lastReviewed", "supportEmail", "navigation"])) {
  contentFindings.push({ source: "site.json", issue: `Missing field: ${field}` });
}
for (const [index, fact] of (factsContent.facts || []).entries()) {
  const missingFact = missingFields(fact, ["id", "claim", "status", "owner", "lastReviewed", "source", "canonicalUrl"]);
  if (missingFact.length) contentFindings.push({ source: `facts/public-facts.json#${fact.id || index}`, issue: `Missing fields: ${missingFact.join(", ")}` });
}
const pageEntries = [];
for (const filename of (await readdir(path.join(CONTENT_DIR, "pages"))).filter((name) => name.endsWith(".md")).sort()) {
  const parsed = matter(await readFile(path.join(CONTENT_DIR, "pages", filename), "utf8"));
  const missingPage = missingFields(parsed.data, ["title", "path", "description", "lastReviewed", "audiences", "source", "canonicalUrl"]);
  if (missingPage.length) contentFindings.push({ source: `pages/${filename}`, issue: `Missing fields: ${missingPage.join(", ")}` });
  if (/—/.test(parsed.data.description || "")) contentFindings.push({ source: `pages/${filename}`, issue: "Frontmatter description carries an em dash" });
  pageEntries.push({ filename, ...parsed.data, lastReviewed: isoDate(parsed.data.lastReviewed) });
}
const generatedPaths = new Set(pageEntries.map((page) => normalizeRoute(page.path)));
generatedPaths.add("/search/index.html");
generatedPaths.add("/404.html");
const landingHubPaths = new Set(pageEntries.filter((page) => page.landingHub).map((page) => normalizeRoute(page.path)));

// Freshness: warn at 120 days, fail at 365.
const now = Date.now();
for (const entry of [...pageEntries.map((page) => ({ source: `pages/${page.filename}`, lastReviewed: page.lastReviewed })), { source: "site.json", lastReviewed: isoDate(siteContent.lastReviewed) }]) {
  if (!entry.lastReviewed) {
    freshnessFailures.push({ source: entry.source, issue: "lastReviewed is not a date" });
    continue;
  }
  const ageDays = Math.floor((now - Date.parse(`${entry.lastReviewed}T12:00:00Z`)) / 86_400_000);
  if (ageDays > 365) freshnessFailures.push({ source: entry.source, issue: `Not reviewed in ${ageDays} days` });
  else if (ageDays > 120) freshnessWarnings.push({ source: entry.source, issue: `Not reviewed in ${ageDays} days` });
}

// Navigation data: every content page is reachable from a menu, and every menu
// entry points at a page that exists.
const navEntries = flattenNavigation(siteContent.navigation || []);
const navHrefs = new Set(navEntries.map((entry) => normalizeRoute(entry.href)));
for (const page of pageEntries) {
  const route = normalizeRoute(page.path);
  if (route !== "/" && !navHrefs.has(route)) navigation.push({ page: route, issue: "Content page is missing from content/site.json navigation" });
}
for (const entry of navEntries) {
  if (!(await resolveLocalTarget(entry.href))) navigation.push({ page: entry.href, issue: `Navigation entry points at a missing page: ${entry.label}` });
}

// Every published DSMLP documentation address must have a destination before
// the old site can be retired.
const redirectSources = new Set();
for (const entry of redirectContent.redirects || []) {
  if (redirectSources.has(entry.from)) contentFindings.push({ source: "redirects/dsmlp-docs.json", issue: `Duplicate redirect source: ${entry.from}` });
  redirectSources.add(entry.from);
  if (!(await resolveLocalTarget(entry.to))) contentFindings.push({ source: "redirects/dsmlp-docs.json", issue: `Redirect target does not exist: ${entry.from} -> ${entry.to}` });
}

const idsByFile = new Map();
async function idsFor(relativeFile) {
  if (!idsByFile.has(relativeFile)) {
    const html = await readFile(path.join(DIST_DIR, relativeFile), "utf8").catch(() => null);
    idsByFile.set(relativeFile, html === null ? null : new Set(load(html)("[id]").map((_, element) => element.attribs.id).get()));
  }
  return idsByFile.get(relativeFile);
}

for (const page of htmlFiles) {
  const renderedHtml = await readFile(path.join(DIST_DIR, page), "utf8");
  const $ = load(renderedHtml);
  const route = page === "index.html" ? "/" : `/${page}`;
  const pageIds = new Set($("[id]").map((_, element) => $(element).attr("id")).get());
  idsByFile.set(page, pageIds);

  for (const stylesheet of requiredDecoratorStylesheets) {
    if ($(`link[rel~='stylesheet'][href='${stylesheet}']`).length !== 1) {
      decorator.push({ page: route, issue: `Missing official Decorator 5 stylesheet: ${stylesheet}` });
    }
  }
  chromeByRoute.set(route, extractChrome($, { route, basePath: SITE_BASE_PATH }));
  const regions = regionElements($);
  for (const finding of checkStructuralRules($, regions, chromeSelectorRules, { route, basePath: SITE_BASE_PATH })) {
    chrome.push({ page: route, ...finding });
  }
  for (const node of Object.values(regions)) collectTokens($, node, chromeTokens);
  const canvas = $("main#main-content").first();
  if (canvas.length) collectTokens($, canvas, canvasTokens);

  if (!$("body").hasClass("agent-page")) decorator.push({ page: route, issue: "Page is missing the shared Decorator extension class" });
  $("[style]").each((_, element) => {
    if (/font-family\s*:/i.test($(element).attr("style") || "")) {
      decorator.push({ page: route, issue: "Inline font-family overrides the Decorator 5 type system" });
    }
  });
  $(".hub-action-card, .hub-story-card").each((_, element) => {
    const component = $(element);
    if (!component.hasClass("panel") || !component.hasClass("panel-default")) {
      decorator.push({ page: route, issue: "Custom landing card must extend the Decorator panel component" });
    }
  });

  const ids = new Map();
  $("[id]").each((_, element) => {
    const id = $(element).attr("id");
    ids.set(id, (ids.get(id) || 0) + 1);
  });
  for (const [id, count] of ids) {
    if (count > 1) navigation.push({ page: route, issue: `Duplicate id: ${id}` });
  }
  $("[tabindex]").each((_, element) => {
    const value = Number($(element).attr("tabindex"));
    if (Number.isFinite(value) && value > 0) accessibility.push({ page: route, issue: `Positive tabindex: ${value}` });
  });
  $("[title]").not("title, svg title, abbr, iframe").each((_, element) => {
    accessibility.push({ page: route, issue: `title attribute used as a tooltip on <${element.tagName}>` });
  });
  $("label[for]").each((_, element) => {
    const label = $(element);
    const targetId = label.attr("for");
    const target = $(`[id='${targetId}']`);
    if (target.length !== 1) {
      accessibility.push({ page: route, issue: `Label target is missing or duplicated: ${targetId}` });
      return;
    }
    if (label.closest("form").get(0) !== target.closest("form").get(0)) {
      accessibility.push({ page: route, issue: `Label and control are not in the same form: ${targetId}` });
    }
  });

  // Primary navigation marks exactly the owning section active.
  const primaryNav = $("#navbar > .navbar-nav-list").first();
  if (!primaryNav.length) {
    navigation.push({ page: route, issue: "Primary navigation is missing" });
  } else {
    const primaryItems = primaryNav.children("li").toArray();
    const activeItems = primaryItems.filter((item) => $(item).hasClass("active"));
    const expectedOwner = navigationOwner(siteContent.navigation || [], route === "/" ? "/index.html" : route);
    if (!expectedOwner && activeItems.length) navigation.push({ page: route, issue: "Primary navigation should not have an active item" });
    if (expectedOwner) {
      const expectedItem = primaryItems.find(
        (item) => normalizeRoute(toLocalUrl($(item).children("a").attr("href"), page)?.pathname || "") === normalizeRoute(expectedOwner.href),
      );
      if (!expectedItem || activeItems.length !== 1 || activeItems[0] !== expectedItem) {
        navigation.push({ page: route, issue: `Incorrect active primary navigation; expected ${expectedOwner.label}` });
      }
    }
  }
  $("[data-tritonai-nav-dropdown]").each((_, element) => {
    const trigger = $(element);
    const controls = trigger.attr("aria-controls");
    if (trigger.attr("aria-haspopup") !== "true" || !["true", "false"].includes(trigger.attr("aria-expanded")) || !controls || ids.get(controls) !== 1) {
      navigation.push({ page: route, issue: "Desktop dropdown is missing a valid ARIA relationship" });
    }
  });
  const mobileToggle = $("[data-tritonai-mobile-toggle]");
  if (mobileToggle.length !== 1 || mobileToggle.attr("aria-controls") !== "mobile-navigation" || !["true", "false"].includes(mobileToggle.attr("aria-expanded")) || ids.get("mobile-navigation") !== 1) {
    navigation.push({ page: route, issue: "Mobile navigation toggle is missing a valid ARIA relationship" });
  }
  const searchToggle = $("[data-tritonai-search-toggle]");
  if (searchToggle.length !== 1 || !["true", "false"].includes(searchToggle.attr("aria-expanded")) || ids.get(searchToggle.attr("aria-controls")) !== 1) {
    navigation.push({ page: route, issue: "Desktop search toggle is missing a valid ARIA relationship" });
  }

  // Layout: hubs are full width with a mobile section menu; every other
  // generated page is two-column with the sidebar after the content.
  const generated = generatedPaths.has(route) || generatedPaths.has(route === "/" ? "/index.html" : route);
  if (generated && !landingHubPaths.has(route)) {
    const mainSection = $("main#main-content .main-section").first();
    const sidebar = $("main#main-content .sidebar-section").first();
    if (!mainSection.length || !sidebar.length) navigation.push({ page: route, issue: "Expected main content and sidebar sections" });
    else {
      for (const requiredClass of ["col-xs-9", "main-section", "pull-right"]) {
        if (!mainSection.hasClass(requiredClass)) navigation.push({ page: route, issue: `Main section is missing ${requiredClass}` });
      }
      for (const requiredClass of ["col-xs-12", "col-md-3", "sidebar-section"]) {
        if (!sidebar.hasClass(requiredClass)) navigation.push({ page: route, issue: `Sidebar is missing ${requiredClass}` });
      }
      const contentOrder = $("main#main-content .main-section, main#main-content .sidebar-section").toArray();
      if (contentOrder.indexOf(mainSection.get(0)) > contentOrder.indexOf(sidebar.get(0))) {
        navigation.push({ page: route, issue: "Sidebar precedes main content in DOM order" });
      }
      // A page with children stays a link at the top of its own list, so the
      // current entry is either plain active text or an active self-link.
      const currentSidebarItems = sidebar.find("li.active").filter((_, item) => {
        const link = $(item).children("a").first();
        return !link.length || normalizeRoute(toLocalUrl(link.attr("href"), page)?.pathname || "") === route;
      });
      if (navHrefs.has(route) && !currentSidebarItems.length) navigation.push({ page: route, issue: "Sidebar does not mark the current page" });
    }
    if ($("main#main-content .about-mobile-section-nav").length !== 1) navigation.push({ page: route, issue: "Subpage must include one mobile section menu" });
  } else if (landingHubPaths.has(route)) {
    const mainSection = $("main#main-content .main-section").first();
    if (!mainSection.length || !mainSection.hasClass("col-xs-12")) navigation.push({ page: route, issue: "Landing hub must use a full-width main section" });
    if ($("main#main-content .sidebar-section").length) navigation.push({ page: route, issue: "Landing hub must not render a sidebar" });
    const owner = navigationOwner(siteContent.navigation || [], route === "/" ? "/index.html" : route);
    if (owner?.items?.length && $("main#main-content .landing-mobile-section-nav").length !== 1) {
      navigation.push({ page: route, issue: "Landing hub must include one mobile section navigation" });
    }
  }

  // Internal links, assets, and fragments.
  for (const attr of ["href", "src", "action", "poster", "data-src", "data-poster", "data-fallback-src", "data-after-render-src", "data-idle-src", "data-search-index"]) {
    for (const element of $(`[${attr}]`).toArray()) {
      if (attr === "href" && element.tagName === "link" && $(element).attr("rel") === "canonical") continue;
      const raw = $(element).attr(attr);
      if (raw?.startsWith("#")) {
        const fragment = decodeURIComponent(raw.slice(1));
        if (fragment && !pageIds.has(fragment) && fragment !== "main-content") brokenFragments.push({ page: route, target: raw });
        continue;
      }
      const target = toLocalUrl(raw, page);
      if (!target) continue;
      if (!(await resolveLocalTarget(target.pathname))) {
        missing.push({ page: route, attribute: attr, target: target.pathname });
        continue;
      }
      if (attr === "href" && target.hash && target.pathname.endsWith(".html") || (attr === "href" && target.hash && target.pathname.endsWith("/"))) {
        const targetIds = await idsFor(relativeFileForPath(target.pathname));
        if (targetIds && !targetIds.has(target.hash)) brokenFragments.push({ page: route, target: `${target.pathname}#${target.hash}` });
      }
    }
  }

  // External links open a new window and say so.
  $("main#main-content a[href^='http']").each((_, element) => {
    const anchor = $(element);
    const href = anchor.attr("href");
    let origin;
    try {
      origin = new URL(href).origin;
    } catch {
      return;
    }
    if (origin === OFFICIAL_ORIGIN) return;
    if (anchor.attr("target") !== "_blank" || !/noopener/.test(anchor.attr("rel") || "")) return;
    if (!anchor.find(".new-window").length && !/opens in new window/i.test(anchor.attr("aria-label") || "")) {
      accessibility.push({ page: route, issue: `New-window link does not say so: ${href}` });
    }
  });

  // Brand: prose uses the new name; code keeps the literal old one.
  if (!legacyNameAllowedRoutes.has(route)) {
    const proseCanvas = $("main#main-content").clone();
    proseCanvas.find("pre, code, a[href^='/about/from-dsmlp-to-parasol']").remove();
    const prose = proseCanvas.text().replace(/\s+/g, " ");
    for (const match of prose.matchAll(/.{0,40}\bDSMLP\b.{0,40}/g)) {
      if (/formerly|former name|new name|DSMLP to PARASOL|DSMLP documentation|called DSMLP|or DSMLP|\(DSMLP\)/i.test(match[0])) continue;
      brandFindings.push({ page: route, issue: `Prose uses the old platform name: "${match[0].trim()}"` });
    }
  }

  // Performance runtime and third-party scripts.
  const preconnects = new Set($("link[rel='preconnect']").map((_, element) => $(element).attr("href")).get());
  for (const origin of preconnectOrigins) {
    if (!preconnects.has(origin)) performance.push({ page: route, issue: `Missing preconnect for ${origin}` });
  }
  if ($("script[src$='/_resources/js/site-performance.js'][defer]").length !== 1) performance.push({ page: route, issue: "Performance runtime is missing or not deferred" });
  if ($("script[src$='/_resources/js/webmcp.js'][defer]").length !== 1) webMcp.push({ page: route, issue: "WebMCP runtime is missing or not deferred" });
  for (const [selector, label] of [["/agent-site.css", "Agent page"], ["/landing-hubs.css", "Landing hub"], ["/parasol.css", "PARASOL"]]) {
    const href = $(`link[href*='${selector}']`).attr("href");
    if (href && !/[?&]v=[a-f0-9]{12}(?:$|&)/.test(href)) performance.push({ page: route, issue: `${label} stylesheet is missing its content cache key` });
  }
  if ($("body").hasClass("landing-hub-page") && !$("link[href*='/landing-hubs.css']").length) {
    performance.push({ page: route, issue: "Landing hub stylesheet is missing" });
  }
  for (const source of afterRenderDecoratorScripts) {
    const script = $(`script[data-after-render-src='${source}']`);
    if (script.length !== 1 || script.attr("src")) performance.push({ page: route, issue: `Decorator dependency is not postponed until after render: ${source}` });
  }
  $("script[src^='http']").each((_, element) => {
    const script = $(element);
    const source = script.attr("src") || "";
    if (script.attr("async") !== undefined || source.includes("googletagmanager.com")) return;
    performance.push({ page: route, issue: `External script blocks initial rendering: ${source}` });
  });
  $("link[rel~='stylesheet'][href^='//'], script[src^='//'], img[src^='//']").each((_, element) => {
    performance.push({ page: route, issue: `Protocol-relative asset must use HTTPS explicitly: ${$(element).attr("href") || $(element).attr("src")}` });
  });
  const emergencyScript = $(`script[src='${emergencyBroadcastScript}']`);
  if (emergencyScript.length !== 1 || emergencyScript.attr("async") === undefined) {
    performance.push({ page: route, issue: "Emergency broadcast must remain live without blocking rendering" });
  }
  const idleWidget = $(`script[data-idle-src='${tritonGptWidgetScript}']`);
  if (idleWidget.length !== 1 || idleWidget.attr("src")) performance.push({ page: route, issue: "TritonGPT widget must initialize during browser idle time" });

  const analyticsLoader = $("script[data-tritonai-analytics][src]");
  const strayAnalytics = $("script[src*='googletagmanager.com']:not([data-tritonai-analytics])");
  if (googleAnalyticsId) {
    if (analyticsLoader.length !== 1 || analyticsLoader.attr("src") !== `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`) {
      analytics.push({ page: route, issue: `Page must carry exactly one build-injected analytics tag for ${googleAnalyticsId}` });
    }
  } else if (analyticsLoader.length) {
    analytics.push({ page: route, issue: "Analytics tag present but site.json configures no measurement ID" });
  }
  if (strayAnalytics.length) analytics.push({ page: route, issue: "Page carries a hand-authored analytics tag; the build owns this tag" });

  for (const element of $("img").toArray()) {
    const image = $(element);
    if (image.attr("alt") === undefined) accessibility.push({ page: route, issue: `Image missing alt attribute: ${image.attr("src")}` });
    const localImage = toLocalUrl(image.attr("src"), page);
    // The active rotator slide paints on load, as on the TritonAI site.
    if (localImage?.pathname.startsWith("/_images/") && !image.hasClass("first-slide")) {
      if (image.attr("loading") !== "lazy") performance.push({ page: route, issue: `Local image must load lazily: ${localImage.pathname}` });
      if (image.attr("decoding") !== "async") performance.push({ page: route, issue: `Local image must decode asynchronously: ${localImage.pathname}` });
    }
    const size = await localAssetSize(image.attr("src"), page);
    if (size && size > imageBudgetBytes) performance.push({ page: route, issue: `Image exceeds ${imageBudgetBytes} bytes: ${image.attr("src")}` });
  }
  for (const element of $("[style*='background-image']").toArray()) {
    const style = $(element).attr("style") || "";
    for (const [, , url] of style.matchAll(/url\((['"]?)([^'")]+)\1\)/gi)) {
      if (SITE_BASE_PATH && url.startsWith("/") && !url.startsWith(`/${SITE_BASE_PATH}/`)) {
        missing.push({ page: route, attribute: "style", target: url, issue: "Inline background URL is missing the site base path" });
      }
      const size = await localAssetSize(url, page);
      if (size && size > imageBudgetBytes) performance.push({ page: route, issue: `Background image exceeds ${imageBudgetBytes} bytes: ${url}` });
    }
  }

  // Document structure.
  if ($("main#main-content").length !== 1) accessibility.push({ page: route, issue: "Expected one main landmark" });
  if ($("h1").length !== 1) accessibility.push({ page: route, issue: `Expected one h1; found ${$("h1").length}` });
  let previousLevel = 1;
  $("main#main-content").find("h1, h2, h3, h4, h5, h6").each((_, element) => {
    const level = Number(element.tagName.slice(1));
    if (level > previousLevel + 1) accessibility.push({ page: route, issue: `Heading level skips from h${previousLevel} to h${level}: ${$(element).text().trim().slice(0, 60)}` });
    previousLevel = level;
  });
  // Banners hold an eyebrow and a title only; taglines go in the page body.
  if ($("main#main-content .intro-banner .discovery-hero-description").length) {
    accessibility.push({ page: route, issue: "Banner carries a tagline under the title; move it into the page body" });
  }
  // Homepage rotator checks, ported from the TritonAI validator.
  if (route === "/") {
    const heroSlides = homeHeroContent.slides || [];
    const multipleHeroSlides = heroSlides.length > 1;
    if ($("#heroslider").length !== 1) accessibility.push({ page: route, issue: "Homepage hero rotator is missing" });
    if ($("#heroslider .item").length !== heroSlides.length) {
      contentFindings.push({ source: route, issue: `Rendered hero slide count does not match content (${$("#heroslider .item").length} vs ${heroSlides.length})` });
    }
    if ($("#heroslider h1").length || $("#heroslider .hero-slide-heading").length !== heroSlides.length) {
      accessibility.push({ page: route, issue: "Homepage carousel must use one h2 heading per slide and no h1 headings" });
    }
    if (!$("#home-intro-heading").is("h1")) accessibility.push({ page: route, issue: "Homepage h1 must be the intro heading below the rotator" });
    if ($("#heroslider [data-module='hero-homepage']").first().text().trim() !== heroSlides[0]?.linkLabel) {
      contentFindings.push({ source: route, issue: "Homepage hero CTA does not match structured content" });
    }
    if (multipleHeroSlides && $("[data-home-hero-toggle]").length !== 1) accessibility.push({ page: route, issue: "Homepage hero pause control is missing" });
    if (!multipleHeroSlides && $("[data-home-hero-toggle], #heroslider .carousel-control").length) accessibility.push({ page: route, issue: "Single-slide homepage hero must not render carousel controls" });
    const inactiveHeroImages = $("#heroslider .item:not(.active) img.first-slide");
    if (multipleHeroSlides && (!inactiveHeroImages.length || inactiveHeroImages.filter("[data-src$='.webp']").length !== inactiveHeroImages.length)) {
      performance.push({ page: route, issue: "Inactive hero images must use deferred optimized sources" });
    }
    const activeHeroImage = $("#heroslider .item.active img.first-slide");
    const desktopHeroSource = $("#heroslider .item.active picture source[media='(min-width: 768px)']");
    const mobileHeroPath = toLocalUrl(activeHeroImage.attr("src"), page)?.pathname;
    const desktopHeroPath = toLocalUrl(desktopHeroSource.attr("srcset"), page)?.pathname;
    const mobileHeroBytes = await localAssetSize(activeHeroImage.attr("src"), page);
    if (mobileHeroPath !== heroSlides[0]?.mobileImage || !mobileHeroBytes || mobileHeroBytes > 100_000 || activeHeroImage.attr("fetchpriority") !== "high") {
      performance.push({ page: route, issue: "Homepage must prioritize the mobile-sized hero image" });
    }
    if (desktopHeroPath !== heroSlides[0]?.image || desktopHeroPath === mobileHeroPath) {
      performance.push({ page: route, issue: "Homepage hero must provide the full-width source at the desktop breakpoint" });
    }
    if ($("script[src$='/_resources/js/home-hero.js'][defer]").length !== (multipleHeroSlides ? 1 : 0)) {
      performance.push({ page: route, issue: "Homepage rotator script is missing or not deferred" });
    }
  }
  if ($(".skip-to-main[href='#main-content']").length !== 1) accessibility.push({ page: route, issue: "Missing skip link to main content" });
  if ($("[autofocus]").length) accessibility.push({ page: route, issue: "autofocus is present" });
  if (/user-scalable\s*=\s*no|maximum-scale\s*=\s*1(?:\.0)?\b/i.test($("meta[name='viewport']").attr("content") || "")) {
    accessibility.push({ page: route, issue: "Viewport zoom is disabled" });
  }
  $("table").each((_, element) => {
    if (!$(element).find("th").length) accessibility.push({ page: route, issue: "Table has no header cells" });
  });

  // Metadata.
  const title = $("title").text().trim();
  const robots = $("meta[name='robots']").attr("content") || "";
  const canonical = $("link[rel='canonical']").attr("href");
  if (!canonical) metadata.push({ page: route, issue: "Missing canonical URL" });
  else if (!canonical.startsWith(`${OFFICIAL_ORIGIN}/`)) metadata.push({ page: route, issue: `Canonical URL is not on ${OFFICIAL_ORIGIN}: ${canonical}` });
  if (!SITE_BASE_PATH && route !== "/404.html" && /noindex/i.test(robots) && !/noindex/i.test(seoContent.routes?.[route]?.robots || "")) {
    metadata.push({ page: route, issue: "Production build page is unexpectedly noindex" });
  }
  if (SITE_BASE_PATH && !/noindex/i.test(robots)) metadata.push({ page: route, issue: "Review build page must be noindex" });
  if (!title) metadata.push({ page: route, issue: "Missing title" });
  else if (route !== "/404.html") {
    if (!metadataTitles.has(title)) metadataTitles.set(title, []);
    metadataTitles.get(title).push(route);
    if (title.length > 65) metadata.push({ page: route, issue: `Title exceeds 65 characters: ${title.length}` });
  }
  const metaDescription = $("meta[name='description']").attr("content") || "";
  if (!metaDescription) metadata.push({ page: route, issue: "Missing description" });
  else if (metaDescription.length > 155) metadata.push({ page: route, issue: `Description exceeds 155 characters: ${metaDescription.length}` });
  for (const property of ["og:title", "og:description", "og:url", "og:site_name", "og:image", "og:image:alt"]) {
    if (!$(`meta[property='${property}']`).attr("content")) metadata.push({ page: route, issue: `Missing ${property}` });
  }
  if ($("meta[name='twitter:card']").attr("content") !== "summary_large_image") metadata.push({ page: route, issue: "Missing large-image Twitter card" });
  for (const name of ["twitter:title", "twitter:description", "twitter:image", "twitter:image:alt"]) {
    if (!$(`meta[name='${name}']`).attr("content")) metadata.push({ page: route, issue: `Missing ${name}` });
  }
  const schemaSource = $("script[type='application/ld+json'][data-tritonai-schema]").first().text();
  if (!schemaSource) metadata.push({ page: route, issue: "Missing JSON-LD" });
  else {
    try {
      const parsedSchema = JSON.parse(schemaSource);
      const schemaNodes = Array.isArray(parsedSchema) ? parsedSchema : [parsedSchema];
      const pageSchema = schemaNodes.find((node) => ["WebSite", "WebPage", "TechArticle"].includes(node?.["@type"]));
      if (!pageSchema) metadata.push({ page: route, issue: "JSON-LD is missing a WebSite, WebPage, or TechArticle node" });
      else {
        if (pageSchema.inLanguage !== "en-US") metadata.push({ page: route, issue: "JSON-LD must identify en-US content" });
        if (pageSchema.publisher?.["@id"] !== `${OFFICIAL_ORIGIN}/#organization`) metadata.push({ page: route, issue: "JSON-LD publisher must reference UC San Diego" });
      }
      if (route === "/") {
        const website = schemaNodes.find((node) => node?.["@type"] === "WebSite");
        if (website?.name !== brand) metadata.push({ page: route, issue: `Homepage WebSite schema must identify ${brand}` });
      }
    } catch (error) {
      metadata.push({ page: route, issue: `Invalid JSON-LD: ${error.message}` });
    }
  }
}

for (const [title, routes] of metadataTitles) {
  if (routes.length > 1) metadata.push({ page: routes.join(", "), issue: `Duplicate title: ${title}` });
}

{
  const structural = chrome.splice(0, chrome.length);
  chrome.push(...foldByRule(structural));
  chrome.push(...checkCrossPageConsistency(chromeByRoute));
  chrome.push(...checkGoldenFingerprint(chromeByRoute, await loadChromeContract()));
  chrome.push(...(await collectStyling({ chromeTokens, canvasTokens })).findings);
}

for (const filename of files.filter((file) => file.startsWith("_resources/css/") && file.endsWith(".css"))) {
  const source = await readFile(path.join(DIST_DIR, filename), "utf8");
  for (const match of source.matchAll(/font-family\s*:\s*([^;}]+)/gi)) {
    const family = match[1].trim();
    if (!/\b(?:Roboto|Teko-SemiBold)\b/i.test(family) && !/monospace|inherit/i.test(family)) {
      decorator.push({ page: `/${filename}`, issue: `Non-Decorator font-family declaration: ${family}` });
    }
  }
}

const performanceRuntimeSource = await readFile(path.join(DIST_DIR, "_resources/js/site-performance.js"), "utf8").catch(() => "");
for (const behavior of ["IntersectionObserver", "requestIdleCallback", "data-after-render-src"]) {
  if (!performanceRuntimeSource.includes(behavior)) performance.push({ page: "/_resources/js/site-performance.js", issue: `Missing runtime behavior: ${behavior}` });
}
const webMcpRuntimeSource = await readFile(path.join(DIST_DIR, "_resources/js/webmcp.js"), "utf8").catch(() => "");
for (const behavior of ["document.modelContext", "registerTool", "get-parasol-page", "list-parasol-page-links", "readOnlyHint", "untrustedContentHint"]) {
  if (!webMcpRuntimeSource.includes(behavior)) webMcp.push({ page: "/_resources/js/webmcp.js", issue: `Missing WebMCP behavior: ${behavior}` });
}

let routeManifest = null;
try {
  routeManifest = JSON.parse(await readFile(path.join(DIST_DIR, "_data/routes.json"), "utf8"));
} catch (error) {
  contentFindings.push({ source: "dist/_data/routes.json", issue: error.message });
}
const sitemap = await readFile(path.join(DIST_DIR, "sitemap.xml"), "utf8").catch(() => "");
const routeFindings = [];
if (!routeManifest || routeManifest.routes?.length !== htmlFiles.length) {
  routeFindings.push({ issue: `Route manifest count does not match HTML count (${routeManifest?.routes?.length || 0} vs ${htmlFiles.length})` });
} else {
  for (const route of routeManifest.routes) {
    const included = sitemap.includes(`<loc>${route.canonicalUrl}</loc>`);
    if (route.indexable && !included) routeFindings.push({ path: route.path, issue: "Indexable route is missing from sitemap" });
    if (!route.indexable && included) routeFindings.push({ path: route.path, issue: "Non-indexable route appears in sitemap" });
  }
}
for (const required of ["404.html", "robots.txt", "_data/search-index.json", "_data/redirects.json"]) {
  if (!(await exists(path.join(DIST_DIR, required)))) routeFindings.push({ path: `/${required}`, issue: "Required file is missing" });
}

const remoteChecks = [];
if (!OFFLINE) {
  for (const url of requiredRemoteDependencies) {
    const attempts = [];
    for (const [attemptIndex, method] of ["HEAD", "GET", "GET"].entries()) {
      try {
        const response = await fetch(url, { method, headers: { "User-Agent": "parasol-website-validator" }, signal: AbortSignal.timeout(15000) });
        attempts.push({ attempt: attemptIndex + 1, method, status: response.status, ok: response.ok });
        if (response.ok) break;
      } catch (error) {
        attempts.push({ attempt: attemptIndex + 1, method, status: "FETCH_ERROR", ok: false, error: error.message });
      }
    }
    const finalAttempt = attempts.find((attempt) => attempt.ok) || attempts.at(-1);
    remoteChecks.push({ url, ...finalAttempt, attempts });
  }
}

const report = {
  checkedAt: new Date().toISOString(),
  counts: {
    files: files.length,
    htmlFiles: htmlFiles.length,
    contentPages: pageEntries.length,
    dsmlpRedirects: (redirectContent.redirects || []).length,
    missingInternalTargets: missing.length,
    brokenFragments: brokenFragments.length,
    remoteDependencyFailures: remoteChecks.filter((check) => !check.ok).length,
    contentSchemaFailures: contentFindings.length,
    freshnessWarnings: freshnessWarnings.length,
    freshnessFailures: freshnessFailures.length,
    accessibilityFailures: accessibility.length,
    navigationFailures: navigation.length,
    metadataFailures: metadata.length,
    routeFailures: routeFindings.length,
    performanceFailures: performance.length,
    decoratorFailures: decorator.length,
    chromeFailures: chrome.length,
    analyticsFailures: analytics.length,
    webMcpFailures: webMcp.length,
    brandFailures: brandFindings.length,
  },
  missing,
  brokenFragments,
  remoteChecks,
  contentFindings,
  freshnessWarnings,
  freshnessFailures,
  accessibility,
  navigation,
  metadata,
  routeFindings,
  performance,
  decorator,
  chrome,
  analytics,
  webMcp,
  brandFindings,
};
await mkdir(REPORT_DIR, { recursive: true });
await writeFile(path.join(REPORT_DIR, "validation.json"), `${JSON.stringify(report, null, 2)}\n`);

process.stdout.write(`${JSON.stringify(report.counts, null, 2)}\n`);
const remoteFailures = remoteChecks.filter((check) => !check.ok);
if (remoteFailures.length) {
  process.stdout.write(`::warning::${remoteFailures.length} remote dependency check(s) failed\n`);
  for (const check of remoteFailures) process.stdout.write(`  ${check.url}\n`);
}
const failures = [missing, brokenFragments, contentFindings, freshnessFailures, accessibility, navigation, metadata, routeFindings, performance, decorator, chrome, analytics, webMcp, brandFindings];
if (failures.some((list) => list.length)) {
  if (chrome.length) process.stderr.write(`${formatFindings(chrome)}\n\n`);
  process.stderr.write("Validation failed. See reports/validation.json.\n");
  process.exit(1);
} else {
  process.stdout.write("Validation passed.\n");
}
