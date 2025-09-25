// /scripts/ui/mobileMenu.js
export function setupMobileMenu() {
  const openBtn  = document.getElementById("mobile-menu-btn");
  const overlay  = document.getElementById("mobile-menu-overlay");
  const panel    = document.getElementById("mobile-menu");
  const closeBtn = document.getElementById("mobile-menu-close");
  const body     = document.body;

  if (!openBtn || !overlay || !panel || !closeBtn) return;

  const isMobile = () => window.matchMedia("(max-width: 1023px)").matches;

  const open = () => {
    if (!isMobile()) return;          // only on mobile/tablet
    overlay.hidden = false;
    panel.hidden = false;
    body.classList.add("menu-open");  // stop background scroll
  };

  const close = () => {
    overlay.hidden = true;
    panel.hidden = true;
    body.classList.remove("menu-open");
  };

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);

  // Close with Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) close();
  });

  // If user resizes from mobile -> desktop while open, close the panel
  window.addEventListener("resize", () => {
    if (!isMobile() && !panel.hidden) {
      overlay.hidden = true;
      panel.hidden = true;
      body.classList.remove("menu-open");
    }
  });
}
