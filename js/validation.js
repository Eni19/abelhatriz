// Answer validation.
//
// Answers are never stored as plain text in the source — only as a SHA-256 hash
// (see phases.js `answerHash`). This stops a casual "view source" / devtools peek
// from just reading the answer off the page. It is NOT real security: anyone who
// really wants to could still brute-force short/guessable answers offline, since
// the hash itself ships in the frontend. Treat this as "hidden from a spoiler",
// not as auth. If you want real security later, set `window.ARG_CONFIG.backendUrl`
// (see bottom of this file) and answers get checked server-side instead — nothing
// else in the app needs to change.

/**
 * Normalizes user input so answers are forgiving of case, extra whitespace,
 * and accents (e.g. "Saudade", " saudade ", "saudáde" all match the same hash).
 * @param {string} text
 */
function normalize(text) {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "") // strip accents (combining diacritics)
    .replace(/[-\s]/g, ""); // strip hyphens and spaces
}

/**
 * @param {string} text
 * @returns {Promise<string>} hex-encoded SHA-256 digest of the normalized text
 */
export async function sha256Hex(text) {
  const bytes = new TextEncoder().encode(normalize(text));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Checks a raw user answer against a phase's expected answer.
 * Swappable: if `window.ARG_CONFIG.backendUrl` is set, delegates to a backend
 * endpoint instead of comparing hashes locally. See tools/hash-generator.html
 * for generating `answerHash` values while writing phases.
 *
 * @param {{ id: number, answerHash: string }} phase
 * @param {string} rawInput
 * @returns {Promise<boolean>}
 */
export async function checkAnswer(phase, rawInput) {
  const backendUrl = window.ARG_CONFIG?.backendUrl;

  if (backendUrl) {
    const response = await fetch(`${backendUrl}/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phaseId: phase.id, answer: normalize(rawInput) }),
    });
    if (!response.ok) return false;
    const data = await response.json();
    return Boolean(data.correct);
  }

  const hash = await sha256Hex(rawInput);
  return hash === phase.answerHash;
}
