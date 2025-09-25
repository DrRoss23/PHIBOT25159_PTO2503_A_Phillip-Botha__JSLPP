// /scripts/ui/theme.js
const STORAGE_KEY = "theme"; // "light" or "dark"

/* Apply the class that drives CSS variables + overrides */
function applyTheme(theme) {
  document.body.classList.toggle("dark-mode", theme === "dark");
}

/* Prefer stored theme; if none, prefer OS setting once (first visit) */
function initialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

function storeTheme(theme) {
  localStorage.setItem(STORAGE_KEY, theme);
}

/* Keep desktop + mobile checkboxes aligned */
function syncCheckboxes(isDark) {
  const desktopCb = document.getElementById("desktop-theme-toggle");
  const mobileCb  = document.getElementById("mobile-theme-toggle");
  if (desktopCb) desktopCb.checked = isDark;
  if (mobileCb)  mobileCb.checked  = isDark;
}

/* Public: initialize + wire listeners */
export function setupTheme() {
  // 1) Apply initial theme (storage or OS)
  const theme = initialTheme();
  applyTheme(theme);
  syncCheckboxes(theme === "dark");
  storeTheme(theme);

  // 2) Desktop switch
  const desktopCb = document.getElementById("desktop-theme-toggle");
  if (desktopCb) {
    desktopCb.addEventListener("change", (e) => {
      const next = e.target.checked ? "dark" : "light";
      applyTheme(next);
      storeTheme(next);
      syncCheckboxes(next === "dark");
    });
  }

  // 3) Mobile switch
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
