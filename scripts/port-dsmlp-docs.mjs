// Ports the DSMLP documentation into PARASOL content pages.
//
// It was run once on 2026-10-24 against the preview build of 2026-09-29. Pages
// were edited by hand afterwards (the glossary, several descriptions), so never
// point it at this repository's content/ directly. Port into a scratch folder
// and diff, then carry changes across by hand:
//
//   node scripts/port-dsmlp-docs.mjs --fetch https://dsmlp-docs-preview.ucsd.edu /tmp/dsmlp-raw
//   node scripts/port-dsmlp-docs.mjs /tmp/dsmlp-raw /tmp/parasol-port
//   diff -ru content/pages /tmp/parasol-port/content/pages
//
// See docs/dsmlp-migration.md for the rename rules this applies.
import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";

if (process.argv[2] === "--fetch") {
  const [, , , origin, outDir] = process.argv;
  await mkdir(outDir, { recursive: true });
  const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  for (const url of urls) {
    const key = new URL(url).pathname.replace(/^\/+|\/+$/g, "").replaceAll("/", "__") || "index";
    const response = await fetch(`${origin}${new URL(url).pathname}`);
    if (!response.ok) throw new Error(`${response.status} for ${url}`);
    await writeFile(path.join(outDir, `${key}.html`), await response.text());
  }
  process.stdout.write(`Fetched ${urls.length} pages into ${outDir}.\n`);
  process.exit(0);
}

const [RAW, ROOT] = process.argv.slice(2);
const BRAND = "PARASOL";
const OLD_ORIGIN = "https://dsmlp-docs.ucsd.edu";
const SOURCE_REVIEWED = "2026-09-29";

const SECTIONS = {
  access: { label: "Access", order: ["datahub-in-the-browser", "the-login-node", "remote-editor-setup", "sign-in-and-session-problems", "when-access-starts-and-ends"] },
  "workspaces-and-storage": { label: "Workspaces & Storage", order: ["what-a-workspace-is", "your-files-and-quotas", "moving-and-sharing-data", "datasets"] },
  "running-jobs": { label: "Running Jobs", order: ["launch-sh-reference", "job-modes-and-limits", "watching-your-job", "checkpointing", "kubernetes"] },
  "gpu-access": { label: "GPU Access", order: ["gpu-classes", "workloads-by-gpu-class", "gpu-hardware", "reservations", "service-units-and-budgets", "quotas-and-availability", "what-ends-a-session"] },
  environments: { label: "Environments", order: ["standard-images", "customizing-your-environment", "building-a-custom-image"] },
  grading: { label: "Grading", order: ["choosing-a-grading-tool", "notebook-grading-workflow", "grading-failures"] },
  reference: { label: "Reference", order: ["error-messages", "reservation-events", "getting-help", "glossary", "coming-from-hpc", "managing-a-group", "policy", "software"] },
};
const GUIDES = {
  "student-in-a-course": { audiences: ["students"] },
  "working-from-the-command-line": { audiences: ["students"] },
  "student-project": { audiences: ["students", "researchers"] },
  "instructor-or-ta": { audiences: ["instructors", "teaching-assistants"] },
  "individual-researcher": { audiences: ["researchers", "graduate-students"] },
  "faculty-research-lab": { audiences: ["faculty", "researchers"] },
};

// old site path (no slashes) -> new route
const routeMap = new Map([["", "/docs/index.html"], ["search", "/search/index.html"], ["overview", "/about/how-parasol-works.html"]]);
for (const key of Object.keys(GUIDES)) routeMap.set(key, `/get-started/${key}.html`);
for (const [section, { order }] of Object.entries(SECTIONS)) {
  routeMap.set(section, `/docs/${section}/index.html`);
  for (const page of order) routeMap.set(`${section}/${page}`, `/docs/${section}/${page}.html`);
}

const TITLE_OVERRIDES = {
  overview: "How PARASOL Works",
  "instructor-or-ta": "Teaching with PARASOL",
  "individual-researcher": "Research on PARASOL",
};

function rebrand(text) {
  return text
    .replace(/Datahub\s+(?:&amp;|&|and)\s+DSMLP\s+Documentation/g, `${BRAND} Documentation`)
    .replace(/Datahub\s+and\s+DSMLP\s+documentation/g, `${BRAND} documentation`)
    .replace(/Data\s+Science\s+(?:&amp;|&|\/)\s+Machine\s+Learning\s+Platform\s+\(DSMLP\)/g, BRAND)
    .replace(/Datahub\s+and\s+DSMLP\s+are\s+a\s+single\s+service/g, `Datahub and the ${BRAND} cluster are a single service`)
    .replace(/Datahub\s+and\s+DSMLP\s+are\s+not\s+a\s+hosting\s+platform\.\s+They\s+should/g, `${BRAND} is not a hosting platform. It should`)
    .replace(/Datahub\s+and\s+DSMLP\s+are\b/g, `${BRAND} is`)
    .replace(/Datahub\s+and\s+DSMLP\s+have\b/g, `${BRAND} has`)
    .replace(/Datahub\s+(?:and|or)\s+DSMLP/g, BRAND)
    .replace(/Datahub,\s+DSMLP,\s+and/g, `Datahub, ${BRAND}, and`)
    .replace(/\bDSMLP\b/g, BRAND);
}

function rebrandTextNodes($, root) {
  root.find("*").addBack().contents().each((_, node) => {
    if (node.type !== "text") return;
    if ($(node).closest("pre, code").length) return;
    node.data = rebrand(node.data);
  });
}

function mapHref(href, oldKey) {
  if (!href || href.startsWith("#") || /^(mailto:|tel:)/.test(href)) return href;
  let url;
  try {
    url = new URL(href, `${OLD_ORIGIN}/${oldKey ? `${oldKey}/` : ""}`);
  } catch {
    return href;
  }
  if (!/^dsmlp-docs(-preview)?\.ucsd\.edu$/.test(url.hostname)) return href;
  if (url.pathname.startsWith("/images/")) return `/_images/docs/${path.basename(url.pathname)}`;
  const key = url.pathname.replace(/^\/+|\/+$/g, "");
  const route = routeMap.get(key);
  if (!route) throw new Error(`Unmapped internal link ${href} on ${oldKey}`);
  return `${route}${url.hash}`;
}

function describe($, section) {
  const first = section.children("p").first().text().replace(/\s+/g, " ").trim();
  if (first.length <= 200) return first;
  const cut = first.slice(0, 200);
  const sentence = cut.lastIndexOf(". ");
  return sentence > 80 ? cut.slice(0, sentence + 1) : `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

function yamlString(value) {
  return JSON.stringify(value);
}

const redirects = [];
const navigation = {};
await mkdir(path.join(ROOT, "content/pages"), { recursive: true });

for (const file of (await readdir(RAW)).filter((name) => name.endsWith(".html"))) {
  const base = file.replace(/\.html$/, "");
  if (["index", "home", "search"].includes(base)) continue;
  const oldKey = base.replace("__", "/");
  const route = routeMap.get(oldKey);
  if (!route) throw new Error(`No route for ${oldKey}`);

  const $ = load(await readFile(path.join(RAW, file), "utf8"), { decodeEntities: false });
  const section = $("section.main-section").first();
  section.find("a.headerlink, p.docs-edit-link").remove();
  section.find("p").filter((_, el) => /Documentation index/.test($(el).text()) && $(el).find("a").length === 1 && $(el).text().trim().length < 40).remove();

  const h1 = section.find("h1").first();
  const sourceTitle = $("<div>").html($("meta[name='PAGETITLE']").attr("content") || h1.text()).text();
  h1.remove();

  section.find(".docs-note").each((_, el) => {
    const note = $(el);
    const label = note.find(".docs-note__label").first();
    const labelText = label.text().trim() || "Note";
    label.replaceWith(`<p class="docs-callout-label"><strong>${labelText}</strong></p>`);
    const tone = note.hasClass("docs-note--warning") ? "alert-warning" : "alert-info";
    note.attr("class", `alert ${tone} docs-callout`).attr("role", "note");
  });
  section.find("table").each((_, el) => {
    $(el).addClass("table table-striped");
    $(el).wrap('<div class="table-responsive"></div>');
  });
  section.find("pre.highlight").removeClass("highlight").addClass("docs-code");
  section.find("a[href]").each((_, el) => $(el).attr("href", mapHref($(el).attr("href"), oldKey)));
  section.find("img[src]").each((_, el) => {
    const img = $(el);
    img.attr("src", mapHref(img.attr("src"), oldKey));
    img.addClass("img-responsive docs-figure");
  });
  rebrandTextNodes($, section);

  const title = TITLE_OVERRIDES[oldKey] || rebrand(sourceTitle);
  const description = describe($, section);
  const [sectionKey] = oldKey.split("/");
  const isGuide = Boolean(GUIDES[oldKey]);
  const eyebrow = oldKey === "overview" ? "About PARASOL" : isGuide ? "Get started" : SECTIONS[sectionKey]?.label || "Documentation";
  const audiences = isGuide ? GUIDES[oldKey].audiences : ["students", "instructors", "researchers"];
  const slug = route.replace(/^\//, "").replace(/\/index\.html$/, "").replace(/\.html$/, "").replaceAll("/", "-");
  const html = section.html().replace(/\n{3,}/g, "\n\n").trim();

  const frontmatter = [
    "---",
    `title: ${yamlString(title)}`,
    `path: ${route}`,
    `description: ${yamlString(rebrand(description))}`,
    `eyebrow: ${yamlString(eyebrow)}`,
    `lastReviewed: ${SOURCE_REVIEWED}`,
    `audiences: [${audiences.join(", ")}]`,
    `source: ${yamlString(`Ported from the DSMLP documentation (${OLD_ORIGIN}/${oldKey}/), preview build of ${SOURCE_REVIEWED}`)}`,
    `canonicalUrl: ${route}`,
    `legacyUrl: ${OLD_ORIGIN}/${oldKey}/`,
    "format: html",
    "---",
    "",
  ].join("\n");
  await writeFile(path.join(ROOT, "content/pages", `${slug}.md`), `${frontmatter}${html}\n`);
  redirects.push({ from: `${OLD_ORIGIN}/${oldKey}/`, to: route });
  navigation[oldKey] = { title, route };
}

redirects.push({ from: `${OLD_ORIGIN}/`, to: "/index.html" }, { from: `${OLD_ORIGIN}/search/`, to: "/search/index.html" });
redirects.sort((a, b) => a.from.localeCompare(b.from));
await mkdir(path.join(ROOT, "content/redirects"), { recursive: true });
await writeFile(
  path.join(ROOT, "content/redirects/dsmlp-docs.json"),
  `${JSON.stringify({ schemaVersion: 1, description: "Every published DSMLP documentation URL and the PARASOL route that replaces it. Use this map for server-side redirects when dsmlp-docs.ucsd.edu is decommissioned.", source: `${OLD_ORIGIN}/sitemap.xml`, generatedFrom: SOURCE_REVIEWED, redirects }, null, 2)}\n`,
);
process.stdout.write(`${JSON.stringify(navigation, null, 1)}\nPorted ${redirects.length - 2} pages.\n`);
