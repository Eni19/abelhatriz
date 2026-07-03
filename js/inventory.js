// Renders the bouquet/inventory bar: one slot per phase, empty until that
// phase's flower has been collected. Clicking a collected flower shows its
// Victorian floriography meaning in a popup.

import { PHASES } from "./phases.js";

/** Fallback dot icon for flowers that don't have a scanned illustration yet. */
function flowerSVG(color) {
  return `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g fill="${color}">
        <circle cx="12" cy="6.5" r="3.2"/>
        <circle cx="17.5" cy="12" r="3.2"/>
        <circle cx="12" cy="17.5" r="3.2"/>
        <circle cx="6.5" cy="12" r="3.2"/>
      </g>
      <circle cx="12" cy="12" r="2.4" fill="#fdf9f2"/>
    </svg>
  `;
}

/** Bouquet slot content: the real botanical illustration from the book when
 *  we have one, cropped into a little medallion; falls back to the dot icon. */
function flowerMedallion(flower) {
  if (flower.image) {
    return `<img src="${flower.image}" alt="" loading="lazy">`;
  }
  return flowerSVG(flower.color);
}

/**
 * @param {number[]} collectedFlowerIds
 * @param {{ justCollectedId?: number }} [opts]
 */
export function renderBouquet(collectedFlowerIds, opts = {}) {
  const list = document.getElementById("bouquet-slots");
  list.innerHTML = "";

  PHASES.forEach((phase) => {
    const li = document.createElement("li");
    const collected = collectedFlowerIds.includes(phase.id);

    if (!collected) {
      li.className = "bouquet-slot bouquet-slot--empty";
      list.appendChild(li);
      return;
    }

    li.className = "bouquet-slot bouquet-slot--filled";
    if (opts.justCollectedId === phase.id) li.classList.add("just-collected");
    li.style.setProperty("--flower-accent", phase.flower.color || "var(--color-primary)");
    li.innerHTML = flowerMedallion(phase.flower);
    li.title = phase.flower.name || `Fase ${phase.id}`;
    li.addEventListener("click", () => showFlowerPopup(phase));
    list.appendChild(li);
  });
}

let currentPopupPhase = null;

function showFlowerPopup(phase) {
  currentPopupPhase = phase;
  const popup = document.getElementById("flower-popup");
  const media = document.getElementById("flower-popup-media");
  popup.style.setProperty("--flower-accent", phase.flower.color || "var(--color-primary)");
  media.innerHTML = phase.flower.image
    ? `<img src="${phase.flower.image}" alt="Ilustração de ${phase.flower.name || "flor"}">`
    : "";
  document.getElementById("flower-popup-title").textContent = phase.flower.name || phase.title;
  document.getElementById("flower-popup-meaning").textContent = phase.flower.meaning || "";
  popup.hidden = false;
}

export function initFlowerPopup(onRevisit) {
  const popup = document.getElementById("flower-popup");
  document.getElementById("flower-popup-close").addEventListener("click", () => {
    popup.hidden = true;
  });
  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.hidden = true;
  });
  document.getElementById("flower-popup-revisit").addEventListener("click", () => {
    if (currentPopupPhase != null && onRevisit) {
      onRevisit(currentPopupPhase.id);
      popup.hidden = true;
    }
  });
}
