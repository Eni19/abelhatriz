// Procedurally generates the decorative vines used throughout the site —
// the nature-layer corner branches and the intro card's corner flourishes.
// Redrawn fresh on every page load (small, controlled randomness) so the
// scene feels grown rather than stamped, while staying inside the same
// cozy-forest palette and class names the GSAP timelines in main.js expect
// (.n-vine/.n-leaf/.n-flower and .vine-branch/.vine-leaf/.vine-berry), so
// no changes are needed there beyond calling paintVines() before they run.

const DEG = Math.PI / 180;

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rand(rng, min, max) { return min + rng() * (max - min); }
function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }

const LEAF_COLORS = ["var(--color-primary)", "var(--color-primary-dark)"];

/* ---------- shape builders (drawn in local space, then translated/rotated) ---------- */

function leafMarkup(x, y, angle, len, wid, color, cls) {
  const h = wid / 2;
  const d =
    `M0,0 C${(len * .2).toFixed(1)},${(-h * 1.2).toFixed(1)} ${(len * .65).toFixed(1)},${(-h * .9).toFixed(1)} ${len.toFixed(1)},0 ` +
    `C${(len * .65).toFixed(1)},${(h * .9).toFixed(1)} ${(len * .2).toFixed(1)},${(h * 1.2).toFixed(1)} 0,0 Z`;
  // Static placement (translate+rotate) lives on an outer wrapper; the inner
  // .n-leaf/.vine-leaf group is left transform-free so GSAP's fromTo({rotation,
  // scale}) — which OVERWRITES rather than composes with a transform, not just
  // adds to it — animates a clean "unfurl in place" instead of stomping the
  // orientation we just computed for it.
  return (
    `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${angle.toFixed(1)})">` +
    `<g class="${cls}">` +
    `<path d="${d}" fill="${color}"/>` +
    `<path d="M${(len * .1).toFixed(1)},0 L${(len * .88).toFixed(1)},0" stroke="rgba(0,0,0,0.25)" stroke-width="0.6" fill="none"/>` +
    `</g></g>`
  );
}

function petalBloom(x, y, angle, radius, petals, petalColor, centerColor, cls, scale) {
  const petalW = radius * 0.55;
  let petalsMarkup = "";
  for (let i = 0; i < petals; i++) {
    const a = (360 / petals) * i;
    petalsMarkup +=
      `<path d="M0,0 C${(-petalW / 2).toFixed(1)},${(-radius * .3).toFixed(1)} ${(-petalW / 2).toFixed(1)},${(-radius * .78).toFixed(1)} 0,${(-radius).toFixed(1)} ` +
      `C${(petalW / 2).toFixed(1)},${(-radius * .78).toFixed(1)} ${(petalW / 2).toFixed(1)},${(-radius * .3).toFixed(1)} 0,0 Z" fill="${petalColor}" transform="rotate(${a.toFixed(1)})"/>`;
  }
  return (
    `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${angle.toFixed(1)}) scale(${scale})">` +
    `<g class="${cls}">${petalsMarkup}<circle r="${(radius * .3).toFixed(1)}" fill="${centerColor}"/></g></g>`
  );
}

function sunflowerBloom(x, y, angle, cls, scale) {
  let petals = "";
  for (let i = 0; i < 8; i++) {
    petals += `<path d="M0,-15 C8,-25 -8,-25 0,-15 Z" fill="var(--color-gold)" transform="rotate(${i * 45})"/>`;
  }
  return (
    `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${angle.toFixed(1)}) scale(${scale})">` +
    `<g class="${cls}"><circle r="14" fill="var(--color-gold)"/>${petals}<circle r="8" fill="#2b2420"/><circle r="7" fill="var(--color-primary-dark)"/></g></g>`
  );
}

function lavenderSpike(x, y, angle, cls, scale) {
  let dots = "";
  const count = 7;
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const py = -t * 30;
    const px = Math.sin(t * 6) * 2.2;
    const r = Math.max(3.2 - t * 1.6, 1.4);
    dots += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${r.toFixed(1)}" fill="var(--color-lavender)"/>`;
  }
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${angle.toFixed(1)}) scale(${scale})"><g class="${cls}">${dots}</g></g>`;
}

function bloomMarkup(kind, x, y, angle, cls, scale) {
  switch (kind) {
    case "rose": return petalBloom(x, y, angle, 13, 5, "var(--color-rose)", "var(--color-gold)", cls, scale);
    case "gold": return petalBloom(x, y, angle, 11, 5, "var(--color-gold)", "var(--color-primary-dark)", cls, scale);
    case "daisy": return petalBloom(x, y, angle, 11, 9, "#fdf9f2", "var(--color-gold)", cls, scale);
    case "sunflower": return sunflowerBloom(x, y, angle, cls, scale);
    case "lavender": return lavenderSpike(x, y, angle, cls, scale);
    default: return petalBloom(x, y, angle, 12, 5, "var(--color-rose)", "var(--color-gold)", cls, scale);
  }
}

function tendril(x, y, angle, scale, color, cls) {
  return (
    `<path class="${cls}" d="M0,0 C${(6 * scale).toFixed(1)},${(-3 * scale).toFixed(1)} ${(9 * scale).toFixed(1)},${(5 * scale).toFixed(1)} ${(2 * scale).toFixed(1)},${(9 * scale).toFixed(1)} ` +
    `C${(-4 * scale).toFixed(1)},${(12 * scale).toFixed(1)} ${(-4 * scale).toFixed(1)},${(3 * scale).toFixed(1)} ${(1 * scale).toFixed(1)},${(2 * scale).toFixed(1)}" ` +
    `fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${angle.toFixed(1)})"/>`
  );
}

/* ---------- organic bezier-chain stem, grown like a little turtle-graphics walk ---------- */

function cubicPoint(seg, t) {
  const mt = 1 - t;
  return {
    x: mt * mt * mt * seg.p0.x + 3 * mt * mt * t * seg.p1.x + 3 * mt * t * t * seg.p2.x + t * t * t * seg.p3.x,
    y: mt * mt * mt * seg.p0.y + 3 * mt * mt * t * seg.p1.y + 3 * mt * t * t * seg.p2.y + t * t * t * seg.p3.y,
  };
}

function cubicAngle(seg, t) {
  const mt = 1 - t;
  const dx = 3 * mt * mt * (seg.p1.x - seg.p0.x) + 6 * mt * t * (seg.p2.x - seg.p1.x) + 3 * t * t * (seg.p3.x - seg.p2.x);
  const dy = 3 * mt * mt * (seg.p1.y - seg.p0.y) + 6 * mt * t * (seg.p2.y - seg.p1.y) + 3 * t * t * (seg.p3.y - seg.p2.y);
  return Math.atan2(dy, dx) / DEG;
}

/** Grows a smoothly-curving multi-segment stem by repeatedly turning a small
 *  random amount and stepping forward — nearby segments share a tangent at
 *  the joint, so the result curls naturally instead of looking jointed. */
function growStem(rng, { x0, y0, heading0, segCount, segLen, turnRange, drift }) {
  let x = x0, y = y0, heading = heading0;
  let d = `M${x.toFixed(1)},${y.toFixed(1)} `;
  const segs = [];
  for (let i = 0; i < segCount; i++) {
    const turn = rand(rng, -turnRange, turnRange) + drift;
    const newHeading = heading + turn;
    const len = segLen * rand(rng, 0.8, 1.2);
    const avg = (heading + newHeading) / 2;
    const p3 = { x: x + Math.cos(avg * DEG) * len, y: y + Math.sin(avg * DEG) * len };
    const p1 = { x: x + Math.cos(heading * DEG) * len * 0.5, y: y + Math.sin(heading * DEG) * len * 0.5 };
    const p2 = { x: p3.x - Math.cos(newHeading * DEG) * len * 0.5, y: p3.y - Math.sin(newHeading * DEG) * len * 0.5 };
    segs.push({ p0: { x, y }, p1, p2, p3, heading: newHeading });
    d += `C${p1.x.toFixed(1)},${p1.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)} ${p3.x.toFixed(1)},${p3.y.toFixed(1)} `;
    x = p3.x; y = p3.y; heading = newHeading;
  }
  return { d, segs };
}

/* ---------- assembling one full decorative branch ---------- */

function buildBranch(rng, cfg, classes) {
  const { vine: vineCls, leaf: leafCls, bloom: bloomCls } = classes;
  const scale = cfg.scale || 1;
  let markup = "";
  const stems = [];

  // A thicker primary stem plus a lighter, shorter secondary one growing
  // from the same root — reads as a small clump rather than a single wire.
  const stemDefs = [
    { headingOffset: 0, segLen: cfg.segLen, width: 3, opacity: 1, color: "var(--color-primary-dark)" },
    { headingOffset: rand(rng, -18, 18), segLen: cfg.segLen * 0.75, width: 1.8, opacity: 0.9, color: "var(--color-primary)" },
  ];

  for (const stem of stemDefs) {
    const { d, segs } = growStem(rng, {
      x0: cfg.x0, y0: cfg.y0,
      heading0: cfg.heading0 + stem.headingOffset,
      segCount: cfg.segCount,
      segLen: stem.segLen,
      turnRange: cfg.turnRange,
      drift: cfg.drift,
    });
    markup += `<path class="${vineCls}" d="${d}" fill="none" stroke="${stem.color}" stroke-width="${stem.width}" stroke-linecap="round" opacity="${stem.opacity}"/>`;
    stems.push(segs);

    let side = rng() > 0.5 ? 1 : -1;
    segs.forEach((seg, i) => {
      if (i === 0 && rng() < 0.4) return; // leave the very root a little bare sometimes
      const leafCount = rng() < 0.55 ? 1 : 2;
      for (let l = 0; l < leafCount; l++) {
        const t = rand(rng, 0.3, 0.85);
        const p = cubicPoint(seg, t);
        const tangent = cubicAngle(seg, t);
        side *= -1;
        const flare = side * rand(rng, 34, 56);
        const len = rand(rng, 15, 24) * scale;
        const wid = len * rand(rng, 0.38, 0.5);
        markup += leafMarkup(p.x, p.y, tangent + flare, len, wid, pick(rng, LEAF_COLORS), leafCls);
      }
    });

    if (rng() < 0.6) {
      const lastSeg = segs[segs.length - 1];
      const p = cubicPoint(lastSeg, 0.95);
      const tangent = cubicAngle(lastSeg, 0.95);
      markup += tendril(p.x, p.y, tangent, rand(rng, 1.4, 2.2) * scale, stem.color, vineCls);
    }
  }

  const primary = stems[0];
  const focusSeg = primary[Math.min(primary.length - 1, Math.max(0, Math.floor(primary.length * 0.65)))];
  const focusPoint = cubicPoint(focusSeg, 0.9);
  markup += bloomMarkup(pick(rng, cfg.bloomPool), focusPoint.x, focusPoint.y, rand(rng, -14, 14), bloomCls, scale);

  if (cfg.secondaryBloom !== false && primary.length > 1) {
    const seg2 = primary[0];
    const p2 = cubicPoint(seg2, rand(rng, 0.55, 0.8));
    markup += bloomMarkup(pick(rng, cfg.bloomPool), p2.x, p2.y, rand(rng, -20, 20), bloomCls, scale * 0.85);
  }

  return markup;
}

/* ---------- per-position layout ---------- */

const ALL_BLOOMS = ["rose", "lavender", "daisy", "sunflower", "gold"];
const DAINTY_BLOOMS = ["rose", "gold", "lavender"];

const NATURE_CONFIG = {
  tl: { xFrac: 0.03, yFrac: 0.03, heading0: 42, segCount: 4, drift: 6, turnRange: 22, scale: 1.1, bloomPool: ALL_BLOOMS },
  tr: { xFrac: 0.9, yFrac: 0.03, heading0: 132, segCount: 4, drift: -6, turnRange: 22, scale: 1.1, bloomPool: ALL_BLOOMS },
  bl: { xFrac: 0.03, yFrac: 0.94, heading0: -40, segCount: 4, drift: -6, turnRange: 22, scale: 1.1, bloomPool: ALL_BLOOMS },
  br: { xFrac: 0.9, yFrac: 0.94, heading0: -138, segCount: 4, drift: 6, turnRange: 22, scale: 1.1, bloomPool: ALL_BLOOMS },
  ml: { xFrac: 0.03, yFrac: 0.5, heading0: 6, segCount: 5, drift: 10, turnRange: 26, scale: 1.05, bloomPool: ALL_BLOOMS },
  mr: { xFrac: 0.94, yFrac: 0.48, heading0: 176, segCount: 5, drift: -10, turnRange: 26, scale: 1.05, bloomPool: ALL_BLOOMS },
};

const INTRO_CONFIG = {
  tl: { xFrac: 0.05, yFrac: 0.85, heading0: -42, segCount: 3, drift: -8, turnRange: 20, scale: 1.05, bloomPool: DAINTY_BLOOMS, secondaryBloom: false },
  br: { xFrac: 0.9, yFrac: 0.2, heading0: 138, segCount: 3, drift: 8, turnRange: 20, scale: 1.05, bloomPool: DAINTY_BLOOMS, secondaryBloom: false },
};

/** Finds whichever class matches `prefix + <one of validKeys>` — plain
 *  startsWith isn't enough here since e.g. "intro-vine-corner" itself starts
 *  with the "intro-vine-" prefix we're stripping from "intro-vine-tl". */
function suffixFromClassList(el, prefix, validKeys) {
  for (const c of el.classList) {
    if (!c.startsWith(prefix)) continue;
    const suffix = c.slice(prefix.length);
    if (validKeys.includes(suffix)) return suffix;
  }
  return null;
}

function paintBranch(svg, cfg, classes, segLen) {
  const rng = mulberry32((Math.random() * 1e9) | 0);
  const vb = svg.viewBox && svg.viewBox.baseVal;
  const w = vb && vb.width ? vb.width : svg.clientWidth || 300;
  const h = vb && vb.height ? vb.height : svg.clientHeight || 400;
  const markup = buildBranch(
    rng,
    { ...cfg, x0: w * cfg.xFrac, y0: h * cfg.yFrac, segLen },
    classes
  );
  svg.innerHTML = markup;
}

/** Sets stroke-dasharray/-dashoffset to each stem's real rendered length so
 *  the GSAP "growing" draw-in animation is accurate no matter how long the
 *  generated path turns out to be (fixed guesses don't work once the paths
 *  are procedural instead of hand-authored). */
function prepareStrokeDraw(selector) {
  document.querySelectorAll(selector).forEach((el) => {
    if (typeof el.getTotalLength !== "function") return;
    const len = el.getTotalLength();
    el.style.strokeDasharray = String(len);
    el.style.strokeDashoffset = String(len);
  });
}

export function paintVines() {
  const natureKeys = Object.keys(NATURE_CONFIG);
  document.querySelectorAll(".nature-branch").forEach((svg) => {
    const key = suffixFromClassList(svg, "nature-branch--", natureKeys);
    const cfg = NATURE_CONFIG[key];
    if (!cfg) return;
    paintBranch(svg, cfg, { vine: "n-vine", leaf: "n-leaf", bloom: "n-flower" }, 70);
  });
  prepareStrokeDraw(".n-vine");

  const introKeys = Object.keys(INTRO_CONFIG);
  document.querySelectorAll(".intro-vine-corner").forEach((svg) => {
    const key = suffixFromClassList(svg, "intro-vine-", introKeys);
    const cfg = INTRO_CONFIG[key];
    if (!cfg) return;
    paintBranch(svg, cfg, { vine: "vine-branch", leaf: "vine-leaf", bloom: "vine-berry" }, 55);
  });
  prepareStrokeDraw(".vine-branch");
}
