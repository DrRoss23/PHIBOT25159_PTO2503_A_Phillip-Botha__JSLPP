// /scripts/ui/sidebar.js

/**
 * Sidebar controls:
 * - Desktop/Tablet: "Hide Sidebar" collapses the sidebar via body.sidebar-collapsed.
 *   A floating button bottom-left (#show-sidebar-btn) restores it.
 * - Mobile: sidebar opens as an overlay with .show-sidebar; floating button opens it.
 */
export function setupSidebar() {
  const sidebar = document.getElementById("side-bar-div");
  const hideBtn = document.getElementById("hide-sidebar-btn");
  const showBtn = document.getElementById("show-sidebar-btn");
  const body = document.body;

  if (!sidebar || !hideBtn || !showBtn) return;

  const hideSidebar = () => {
    // Close overlay if open (mobile)
    sidebar.classList.remove("show-sidebar");
    body.classList.remove("menu-open");
    // Collapse layout (desktop/tablet)
    body.classList.add("sidebar-collapsed");
    showBtn.hidden = false;
  };

  const showSidebar = () => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (isMobile) {
      sidebar.classList.add("show-sidebar");
      body.classList.add("menu-open");
    }
    body.classList.remove("sidebar-collapsed");
    showBtn.hidden = true;
  };

  hideBtn.addEventListener("click", hideSidebar);
  showBtn.addEventListener("click", showSidebar);

  // Click-outside closes overlay on mobile
  document.addEventListener("click", (e) => {
    const isOpenOverlay = sidebar.classList.contains("show-sidebar");
    if (!isOpenOverlay) return;

    const clickedInsideSidebar = sidebar.contains(e.target);
    const clickedShowBtn = showBtn.contains(e.target);
    const clickedHideBtn = hideBtn.contains(e.target);

    if (!clickedInsideSidebar && !clickedShowBtn && !clickedHideBtn) {
      sidebar.classList.remove("show-sidebar");
      body.classList.remove("menu-open");
      showBtn.hidden = false; // keep opener visible after closing overlay
    }
  });

  // Initial visibility: if sidebar is visible, hide the opener
  const sidebarVisible = window.getComputedStyle(sidebar).display !== "none";
  showBtn.hidden = sidebarVisible;
}
