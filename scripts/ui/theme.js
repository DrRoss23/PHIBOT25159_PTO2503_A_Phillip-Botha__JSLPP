/**
 * Module to manage light/dark theme toggling with persistence
 * and synchronization between desktop and mobile checkboxes.
 */

const STORAGE_KEY = "theme"; // "light" or "dark"

/**
 * Applies the theme by toggling the "dark-mode" class on the document body.
 *
 * @param {string} theme - The theme to apply, either "light" or "dark".
 */
function applyTheme(theme) {
  document.body.classList.toggle("dark-mode", theme === "dark");
}

/**
 * Determines the initial theme preference.
 *
 * Checks for a stored theme in localStorage first.
 * If none is found, falls back to the OS-level preference.
 *
 * @returns {"light" | "dark"} The initial theme to use.
 */
function initialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

/**
 * Stores the selected theme in localStorage.
 *
 * @param {string} theme - The theme to store, either "light" or "dark".
 */
function storeTheme(theme) {
  localStorage.setItem(STORAGE_KEY, theme);
}

/**
 * Synchronizes the checked state of desktop and mobile theme toggle checkboxes.
 *
 * @param {boolean} isDark - Whether the theme is dark (true) or light (false).
 */
function syncCheckboxes(isDark) {
  const desktopCb = document.getElementById("desktop-theme-toggle");
  const mobileCb = document.getElementById("mobile-theme-toggle");
  if (desktopCb) desktopCb.checked = isDark;
  if (mobileCb) mobileCb.checked = isDark;
}

/**
 * Initializes theme management by applying the initial theme,
 * setting up event listeners for desktop and mobile theme toggle checkboxes,
 * and keeping their states synchronized.
 *
 * Steps:
 * 1) Apply initial theme based on stored preference or OS setting.
 * 2) Add event listener to desktop theme toggle checkbox.
 * 3) Add event listener to mobile theme toggle checkbox.
 *
 * @returns {void}
 */
export function setupTheme() {
  // 1) Apply initial theme (storage or OS)
  const theme = initialTheme();
  applyTheme(theme);
  syncCheckboxes(theme === "dark");
  storeTheme(theme);

  // 2) Desktop switch: add event listener to update theme on change
  const desktopCb = document.getElementById("desktop-theme-toggle");
  if (desktopCb) {
    desktopCb.addEventListener("change", (e) => {
      const next = e.target.checked ? "dark" : "light";
      applyTheme(next);
      storeTheme(next);
      syncCheckboxes(next === "dark");
    });
  }

  // 3) Mobile switch: add event listener to update theme on change
  const mobileCb = document.getElementById("mobile-theme-toggle");
  if (mobileCb) {
    mobileCb.addEventListener("change", (e) => {
      const next = e.target.checked ? "dark" : "light";
      applyTheme(next);
      storeTheme(next);
      syncCheckboxes(next === "dark");
    });
  }
}
