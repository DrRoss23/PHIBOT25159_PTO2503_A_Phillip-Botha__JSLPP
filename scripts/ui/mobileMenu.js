// scripts/ui/mobileMenu.js
/**
 * This module handles the mobile menu panel's open and close behavior.
 */

/**
 * Wires up the open and close interactions for the mobile menu.
 * Sets up event listeners for buttons, overlay, Escape key, and window resize.
 * @returns {void}
 */
export function setupMobileMenu() {
  const openBtn = document.getElementById("mobile-menu-btn"); // open button
  const overlay = document.getElementById("mobile-menu-overlay"); // overlay behind menu
  const panel = document.getElementById("mobile-menu"); // mobile menu panel
  const closeBtn = document.getElementById("mobile-menu-close"); // close button inside menu
  const body = document.body; // document body for scroll lock

  if (!openBtn || !overlay || !panel || !closeBtn) return;

  // Checks the viewport width to determine if the device is mobile/tablet
  const isMobile = () => window.matchMedia("(max-width: 1023px)").matches;

  // Shows the mobile menu panel and disables background scrolling
  const open = () => {
    if (!isMobile()) return; // only on mobile/tablet
    overlay.hidden = false;
    panel.hidden = false;
    body.classList.add("menu-open"); // stop background scroll
  };

  // Hides the mobile menu panel and re-enables background scrolling
  const close = () => {
    overlay.hidden = true;
    panel.hidden = true;
    body.classList.remove("menu-open");
  };

  // Handles click on open button to show menu
  openBtn.addEventListener("click", open);

  // Handles click on close button to hide menu
  closeBtn.addEventListener("click", close);

  // Handles click on overlay to hide menu
  overlay.addEventListener("click", close);

  // Handles Escape key press to hide menu if open
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) close();
  });

  // Handles window resize to close menu if switching from mobile to desktop
  window.addEventListener("resize", () => {
    if (!isMobile() && !panel.hidden) {
      overlay.hidden = true;
      panel.hidden = true;
      body.classList.remove("menu-open");
    }
  });
}
