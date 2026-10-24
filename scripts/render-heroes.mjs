// Renders the PARASOL hero banners.
//
// Each section gets its own abstract illustration in the TritonAI hero style:
// a deep navy field with the left half kept clear for the page title, a
// translucent blue-and-cyan motif on the right that stands for the section's
// content, fine cyan lines, and a single gold accent. The art is drawn as SVG
// here and rasterized with the Chromium that Playwright already installs.
//
//   node scripts/render-heroes.mjs            # every hero
//   node scripts/render-heroes.mjs gpu-access # one hero
//
// Output: src/site/_images/hero/<name>.webp at 2500x625, the size the
// TritonAI hero banners use. Requires `cwebp` (brew install webp).
import { execFileSync } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { chromium } from "playwright";

const WIDTH = 2500;
const HEIGHT = 625;
const OUTPUT_DIR = path.resolve("src/site/_images/hero");

const NAVY_DEEP = "#0a1a36";
const NAVY = "#0e2650";
const BLUE = "#1a6fc4";
const CYAN = "#1fc2d8";
const LINE = "#43b8e8";
const GOLD = "#ffcd00";

const round = (value) => Math.round(value * 10) / 10;
const points = (list) => list.map(([x, y]) => `${round(x)},${round(y)}`).join(" ");

// An isometric slab: the visual unit for a server, a GPU, a page, a workspace.
function slab(cx, cy, w, d, t, { fill = "url(#slabTop)", opacity = 0.85, edge = 0.5 } = {}) {
  const top = [[cx, cy - d / 2], [cx + w / 2, cy], [cx, cy + d / 2], [cx - w / 2, cy]];
  const right = [[cx + w / 2, cy], [cx, cy + d / 2], [cx, cy + d / 2 + t], [cx + w / 2, cy + t]];
  const left = [[cx - w / 2, cy], [cx, cy + d / 2], [cx, cy + d / 2 + t], [cx - w / 2, cy + t]];
  return `<g opacity="${opacity}">
    <polygon points="${points(left)}" fill="#0f4f97" opacity="0.9"/>
    <polygon points="${points(right)}" fill="#0b3f7d" opacity="0.9"/>
    <polygon points="${points(top)}" fill="${fill}" stroke="${LINE}" stroke-opacity="${edge}" stroke-width="1.5"/>
  </g>`;
}

// Fine flowing lines that run under every motif, as on the TritonAI heroes.
function flowLines(x0, y0, x1, y1, count = 9, spread = 70, opacity = 0.28) {
  let out = "";
  for (let index = 0; index < count; index += 1) {
    const offset = (index - (count - 1) / 2) * (spread / count);
    const c1x = x0 + (x1 - x0) * 0.35;
    const c2x = x0 + (x1 - x0) * 0.7;
    out += `<path d="M${x0},${y0 + offset * 0.4} C${c1x},${y0 + offset * 2.2} ${c2x},${y1 - offset * 1.6} ${x1},${y1 + offset}" fill="none" stroke="${LINE}" stroke-width="1.1" stroke-opacity="${round(opacity * (1 - Math.abs(offset) / (spread * 1.2)))}"/>`;
  }
  return out;
}

const goldDot = (x, y, r = 7) =>
  `<circle cx="${x}" cy="${y}" r="${r * 2.6}" fill="${GOLD}" opacity="0.18" filter="url(#soft)"/><circle cx="${x}" cy="${y}" r="${r}" fill="${GOLD}"/>`;

const ring = (cx, cy, r, width, fill, opacity) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${fill}" stroke-width="${width}" opacity="${opacity}"/>`;

// The PARASOL mark: a canopy of translucent panels with fine ribs.
function canopy(cx, cy, radius, { panels = 7, depth = 0.42, opacity = 0.9 } = {}) {
  const apex = [cx, cy - radius * 0.62];
  const edge = [];
  for (let index = 0; index <= panels; index += 1) {
    const angle = Math.PI + (Math.PI * index) / panels;
    edge.push([cx + radius * Math.cos(angle), cy + radius * depth * Math.sin(angle) * 0.18]);
  }
  let shapes = "";
  for (let index = 0; index < panels; index += 1) {
    const [ax, ay] = edge[index];
    const [bx, by] = edge[index + 1];
    const midX = (ax + bx) / 2;
    const sag = radius * 0.07;
    const tone = index % 2 === 0 ? "url(#canopyA)" : "url(#canopyB)";
    shapes += `<path d="M${round(apex[0])},${round(apex[1])} L${round(ax)},${round(ay)} Q${round(midX)},${round(Math.max(ay, by) + sag)} ${round(bx)},${round(by)} Z" fill="${tone}" stroke="${LINE}" stroke-opacity="0.55" stroke-width="1.4"/>`;
  }
  return `<g opacity="${opacity}">${shapes}${goldDot(apex[0], apex[1] - 14, 7)}</g>`;
}

function defs() {
  return `<defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${NAVY_DEEP}"/>
      <stop offset="0.55" stop-color="${NAVY}"/>
      <stop offset="1" stop-color="#0c2d61"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#1f7fd6" stop-opacity="0.42"/>
      <stop offset="1" stop-color="#1f7fd6" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="slabTop" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${CYAN}" stop-opacity="0.9"/>
      <stop offset="1" stop-color="${BLUE}" stop-opacity="0.85"/>
    </linearGradient>
    <linearGradient id="slabMuted" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2a6fb5" stop-opacity="0.75"/>
      <stop offset="1" stop-color="#173f78" stop-opacity="0.75"/>
    </linearGradient>
    <linearGradient id="canopyA" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${CYAN}" stop-opacity="0.85"/>
      <stop offset="1" stop-color="${BLUE}" stop-opacity="0.55"/>
    </linearGradient>
    <linearGradient id="canopyB" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2b8fe0" stop-opacity="0.75"/>
      <stop offset="1" stop-color="#14529c" stop-opacity="0.5"/>
    </linearGradient>
    <linearGradient id="bar" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="${BLUE}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${CYAN}" stop-opacity="0.9"/>
    </linearGradient>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
    <filter id="haze" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="40"/></filter>
  </defs>`;
}

// A faint grid on the right half, the "cluster" texture shared by every hero.
function grid(opacity = 0.05) {
  let out = "";
  for (let x = 1300; x <= WIDTH; x += 50) out += `<line x1="${x}" y1="0" x2="${x}" y2="${HEIGHT}" stroke="#7fc8ff" stroke-opacity="${opacity}"/>`;
  for (let y = 25; y <= HEIGHT; y += 50) out += `<line x1="1300" y1="${y}" x2="${WIDTH}" y2="${y}" stroke="#7fc8ff" stroke-opacity="${opacity}"/>`;
  return `<g mask="url(#fadeLeft)">${out}</g><mask id="fadeLeft"><linearGradient id="fadeGrad" x1="0" x2="1"><stop offset="0" stop-color="#000"/><stop offset="0.6" stop-color="#fff"/></linearGradient><rect x="1300" y="0" width="1200" height="${HEIGHT}" fill="url(#fadeGrad)"/></mask>`;
}

function frame(motif, glow = [1950, 330, 560]) {
  const [gx, gy, gr] = glow;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
    ${defs()}
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
    <ellipse cx="${gx}" cy="${gy}" rx="${gr}" ry="${gr * 0.62}" fill="url(#glow)"/>
    ${grid()}
    ${motif}
  </svg>`;
}

const HEROES = {
  // Home: the canopy sheltering a row of GPU servers.
  home: () =>
    frame(`
      ${flowLines(1350, 520, 2500, 470, 11, 110)}
      ${[0, 1, 2, 3].map((i) => slab(1660 + i * 145, 475 - i * 8, 180, 90, 26, { opacity: 0.9 })).join("")}
      ${canopy(1880, 345, 390, { panels: 8 })}
      <line x1="1880" y1="320" x2="1880" y2="445" stroke="${LINE}" stroke-opacity="0.45" stroke-width="2"/>
    `, [1880, 370, 600]),

  // About: the canopy alone, larger, the name made visible.
  about: () =>
    frame(`
      ${flowLines(1380, 560, 2500, 520, 9, 90)}
      ${canopy(2000, 380, 400, { panels: 9 })}
      <path d="M2000,300 L2000,540 Q2000,575 1965,575" fill="none" stroke="${LINE}" stroke-opacity="0.55" stroke-width="2.5"/>
    `),

  // Why PARASOL: capacity climbing, bar by bar, to four times the start.
  why: () =>
    frame(`
      ${flowLines(1380, 560, 2500, 540, 9, 80)}
      ${[2, 4, 6, 8].map((levels, i) => {
        const x = 1700 + i * 170;
        let stack = "";
        for (let level = 0; level < levels; level += 1) stack += slab(x, 530 - level * 38, 150, 76, 22, { opacity: 0.5 + level * 0.06 });
        return stack + (i === 3 ? goldDot(x, 530 - levels * 38 - 18, 7) : "");
      }).join("")}
    `, [2000, 380, 560]),

  // From DSMLP to PARASOL: the same platform, outlined, then lit.
  rename: () =>
    frame(`
      ${flowLines(1600, 360, 2300, 330, 13, 120, 0.34)}
      <g opacity="0.55">${slab(1680, 340, 260, 130, 34, { fill: "none", opacity: 0.6, edge: 0.7 })}</g>
      ${slab(2200, 320, 300, 150, 40, { opacity: 0.95 })}
      ${goldDot(2200, 205, 7)}
    `, [2150, 330, 520]),

  // How PARASOL works: containers packed onto a shared cluster.
  works: () =>
    frame(`
      ${flowLines(1380, 560, 2500, 520, 9, 80)}
      ${slab(2000, 420, 620, 310, 30, { fill: "url(#slabMuted)", opacity: 0.8 })}
      ${[[-1, -1], [0, -1], [1, -1], [-1, 0], [0, 0], [1, 0], [-1, 1], [0, 1], [1, 1]].map(([gx, gy], i) => slab(2000 + (gx - gy) * 100, 385 + (gx + gy) * 50, 150, 75, 40, { opacity: i === 4 ? 1 : 0.75 })).join("")}
      ${goldDot(2000, 335, 6)}
    `, [2000, 380, 560]),

  // Get Started: one starting point branching to each reader's guide.
  start: () => {
    const origin = [1560, 330];
    const ends = [[2280, 150], [2380, 260], [2420, 370], [2350, 480], [2230, 570], [2120, 70]];
    const paths = ends
      .map(([x, y]) => `<path d="M${origin[0]},${origin[1]} C${origin[0] + 300},${origin[1]} ${x - 320},${y} ${x},${y}" fill="none" stroke="${LINE}" stroke-width="2.2" stroke-opacity="0.55"/>`)
      .join("");
    const nodes = ends.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="20" fill="url(#slabTop)" opacity="0.9"/>${ring(x, y, 34, 2, LINE, 0.35)}`).join("");
    return frame(`${flowLines(1380, 560, 2500, 520, 7, 60, 0.2)}${paths}${nodes}<circle cx="${origin[0]}" cy="${origin[1]}" r="16" fill="${CYAN}"/>${goldDot(origin[0], origin[1], 7)}`, [2050, 330, 600]);
  },

  // Documentation: stacked pages with lines of text.
  docs: () => {
    let pages = "";
    for (let i = 0; i < 5; i += 1) pages += slab(2020 + i * 26, 470 - i * 62, 420, 210, 10, { opacity: 0.45 + i * 0.12 });
    // Lines of text run parallel to the top page's upper-left edge.
    const [px, py, pw, pd] = [2020 + 4 * 26, 470 - 4 * 62, 420, 210];
    const left = [px - pw / 2, py];
    const bottom = [px, py + pd / 2];
    const along = [pw / 2, -pd / 2];
    let lines = "";
    for (let i = 1; i <= 4; i += 1) {
      const t = 0.16 + i * 0.15;
      const sx = left[0] + (bottom[0] - left[0]) * t + along[0] * 0.18;
      const sy = left[1] + (bottom[1] - left[1]) * t + along[1] * 0.18;
      const length = i === 4 ? 0.38 : 0.62;
      lines += `<line x1="${round(sx)}" y1="${round(sy)}" x2="${round(sx + along[0] * length)}" y2="${round(sy + along[1] * length)}" stroke="#e8f6ff" stroke-opacity="0.4" stroke-width="6" stroke-linecap="round"/>`;
    }
    return frame(`${flowLines(1380, 560, 2500, 520, 9, 80)}${pages}${lines}${goldDot(2260, 165, 7)}`, [2050, 330, 560]);
  },

  // Support: a signal answered.
  support: () =>
    frame(`
      ${flowLines(1380, 540, 2500, 500, 9, 80)}
      ${ring(1900, 320, 90, 26, BLUE, 0.6)}${ring(1900, 320, 160, 2, LINE, 0.4)}${ring(1900, 320, 230, 1.5, LINE, 0.25)}
      ${ring(2210, 330, 120, 34, CYAN, 0.55)}${ring(2210, 330, 200, 2, LINE, 0.35)}
      ${goldDot(2050, 322, 8)}
    `, [2050, 330, 560]),

  // Access: a doorway into the cluster.
  access: () =>
    frame(`
      ${flowLines(1380, 470, 2050, 400, 13, 120, 0.34)}
      ${slab(2180, 430, 460, 230, 30, { fill: "url(#slabMuted)", opacity: 0.85 })}
      <path d="M2120,420 L2120,190 Q2180,150 2240,190 L2240,420" fill="url(#canopyA)" stroke="${LINE}" stroke-opacity="0.7" stroke-width="2" opacity="0.85"/>
      ${goldDot(2180, 300, 7)}
    `, [2150, 340, 520]),

  // Workspaces and storage: stacked storage volumes.
  storage: () => {
    let disks = "";
    for (let i = 0; i < 4; i += 1) {
      const y = 470 - i * 75;
      disks += `<ellipse cx="2050" cy="${y + 40}" rx="220" ry="62" fill="#0b3f7d" opacity="0.85"/><rect x="1830" y="${y}" width="440" height="40" fill="#0f4f97" opacity="0.85"/><ellipse cx="2050" cy="${y}" rx="220" ry="62" fill="url(#slabTop)" stroke="${LINE}" stroke-opacity="0.5" stroke-width="1.5" opacity="${0.6 + i * 0.1}"/>`;
    }
    return frame(`${flowLines(1380, 560, 2500, 520, 9, 80)}${disks}${goldDot(2200, 228, 7)}`, [2050, 330, 560]);
  },

  // Running jobs: work moving along a timeline.
  jobs: () => {
    const bars = [[1700, 190, 420], [1820, 260, 300], [1640, 330, 560], [1960, 400, 360], [1760, 470, 470]];
    const out = bars
      .map(([x, y, w], i) => `<rect x="${x}" y="${y}" width="${w}" height="38" rx="19" fill="url(#slabTop)" opacity="${0.5 + i * 0.1}"/>`)
      .join("");
    const ticks = Array.from({ length: 9 }, (_, i) => `<line x1="${1640 + i * 100}" y1="150" x2="${1640 + i * 100}" y2="540" stroke="${LINE}" stroke-opacity="0.18"/>`).join("");
    return frame(`${ticks}${out}${goldDot(2320, 419, 8)}`, [2000, 340, 560]);
  },

  // GPU access: a GPU card under booked time blocks.
  gpu: () => {
    let blocks = "";
    for (let row = 0; row < 3; row += 1) for (let col = 0; col < 6; col += 1) {
      const booked = (row + col * 2) % 3 === 0;
      blocks += `<rect x="${1780 + col * 92}" y="${130 + row * 62}" width="76" height="46" rx="6" fill="${booked ? "url(#slabTop)" : "none"}" stroke="${LINE}" stroke-opacity="${booked ? 0.6 : 0.3}" stroke-width="1.5" opacity="${booked ? 0.9 : 1}"/>`;
    }
    const fins = Array.from({ length: 12 }, (_, i) => `<line x1="${1840 + i * 34}" y1="400" x2="${1840 + i * 34}" y2="480" stroke="#e8f6ff" stroke-opacity="0.22" stroke-width="5"/>`).join("");
    return frame(`${flowLines(1380, 560, 2500, 520, 9, 80)}${blocks}<rect x="1790" y="370" width="520" height="140" rx="16" fill="url(#slabMuted)" stroke="${LINE}" stroke-opacity="0.55" stroke-width="2"/>${fins}${goldDot(2240, 440, 9)}`, [2050, 330, 560]);
  },

  // Environments: nested layers of a container image.
  environments: () => {
    let layers = "";
    for (let i = 0; i < 4; i += 1) layers += slab(2050, 470 - i * 70, 520 - i * 90, 260 - i * 45, 22, { opacity: 0.5 + i * 0.15 });
    return frame(`${flowLines(1380, 560, 2500, 520, 9, 80)}${layers}${goldDot(2050, 220, 7)}`, [2050, 340, 560]);
  },

  // Grading: notebooks checked off.
  grading: () => {
    let cards = "";
    for (let i = 0; i < 3; i += 1) {
      const x = 1760 + i * 210;
      cards += `<rect x="${x}" y="${170 + i * 40}" width="170" height="230" rx="14" fill="url(#slabMuted)" stroke="${LINE}" stroke-opacity="0.5" stroke-width="1.5"/>`;
      for (let line = 0; line < 4; line += 1) cards += `<line x1="${x + 26}" y1="${210 + i * 40 + line * 32}" x2="${x + 144 - line * 14}" y2="${210 + i * 40 + line * 32}" stroke="#e8f6ff" stroke-opacity="0.3" stroke-width="5" stroke-linecap="round"/>`;
      cards += `<path d="M${x + 52},${350 + i * 40} l24,24 l46,-52" fill="none" stroke="${CYAN}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
    return frame(`${flowLines(1380, 560, 2500, 520, 9, 80)}${cards}${goldDot(2310, 230, 7)}`, [2050, 340, 560]);
  },

  // Reference: an index of tabbed entries.
  reference: () => {
    let rows = "";
    for (let i = 0; i < 6; i += 1) {
      const y = 140 + i * 66;
      rows += `<rect x="1800" y="${y}" width="${380 + (i % 3) * 60}" height="44" rx="8" fill="${i === 2 ? "url(#slabTop)" : "url(#slabMuted)"}" opacity="${i === 2 ? 0.95 : 0.6}"/><rect x="1740" y="${y}" width="44" height="44" rx="8" fill="none" stroke="${LINE}" stroke-opacity="0.5" stroke-width="1.5"/>`;
    }
    return frame(`${flowLines(1380, 560, 2500, 520, 9, 80)}${rows}${goldDot(1762, 294, 7)}`, [2050, 330, 560]);
  },
};

const only = process.argv.slice(2);
const names = only.length ? only : Object.keys(HEROES);
const workDir = path.join(os.tmpdir(), `parasol-heroes-${process.pid}`);
await mkdir(OUTPUT_DIR, { recursive: true });
await mkdir(workDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });
try {
  for (const name of names) {
    if (!HEROES[name]) throw new Error(`Unknown hero: ${name}. Known: ${Object.keys(HEROES).join(", ")}`);
    await page.setContent(`<html><body style="margin:0;background:${NAVY_DEEP}">${HEROES[name]()}</body></html>`);
    const png = path.join(workDir, `${name}.png`);
    await page.screenshot({ path: png, clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } });
    const webp = path.join(OUTPUT_DIR, `${name}.webp`);
    execFileSync("cwebp", ["-quiet", "-q", "82", png, "-o", webp]);
    process.stdout.write(`${path.relative(process.cwd(), webp)}\n`);
  }
} finally {
  await browser.close();
  await rm(workDir, { recursive: true, force: true });
}
