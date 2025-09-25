// /scripts/ui/theme.js
const STORAGE_KEY = "theme"; // "light" or "dark"

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-mode", isDark);
}

function readStoredTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return "light";
}

function setStoredTheme(theme) {
  localStorage.setItem(STORAGE_KEY, theme);
}

function syncCheckboxes(isDark) {
  const desktopCb = document.getElementById("desktop-theme-toggle");
  const mobileCb  = document.getElementById("mobile-theme-toggle");
  if (desktopCb) desktopCb.checked = isDark;
  if (mobileCb)  mobileCb.checked  = isDark;
}

/** Initialize theme from storage and wire both switches (desktop + mobile). */
export function setupTheme() {
  // 1) Apply initial theme
  const initial = readStoredTheme();
  applyTheme(initial);
  syncCheckboxes(initial === "dark");

  // 2) Wire desktop toggle
  const desktopCb = document.getElementById("desktop-theme-toggle");
  if (desktopCb) {
    desktopCb.addEventListener("change", (e) => {
      const next = e.target.checked ? "dark" : "light";
      applyTheme(next);
      setStoredTheme(next);
      syncCheckboxes(next === "dark"); // keep mobile in sync
    });
  }

  // 3) Wire mobile toggle (if present)
  const mobileCb = document.getElementById("mobile-theme-toggle");
  if (mobileCb) {
    mobileCb.addEventListener("change", (e) => {
      const next = e.target.checked ? "dark" : "light";
      applyTheme(next);
      setStoredTheme(next);
      syncCheckboxes(next === "dark"); // keep desktop in sync
    });
  }
}
