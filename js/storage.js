// Persists game progress in localStorage so the game can be closed and resumed
// across days (this is meant to run over the course of a real ARG, not one sitting).

const STORAGE_KEY = "floriografia-progress";

/**
 * @typedef {Object} Progress
 * @property {number} currentPhase - index of the phase currently being played (0-based)
 * @property {number[]} collectedFlowerIds - phase ids whose flower has been collected
 */

/** @returns {Progress} */
export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { currentPhase: 0, collectedFlowerIds: [] };
    const parsed = JSON.parse(raw);
    return {
      currentPhase: Number.isInteger(parsed.currentPhase) ? parsed.currentPhase : 0,
      collectedFlowerIds: Array.isArray(parsed.collectedFlowerIds) ? parsed.collectedFlowerIds : [],
    };
  } catch {
    return { currentPhase: 0, collectedFlowerIds: [] };
  }
}

/** @param {Progress} progress */
export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
