// /scripts/ui/sidebar.js

/**
 * @module sidebar
 *
 * Controls sidebar visibility and behavior for different device types:
 * - On desktop, the sidebar can be collapsed by adding a class to the body,
 *   and restored via a floating button.
 * - On mobile devices and tablet, the sidebar opens as an overlay with specific classes,
 *   toggled by floating buttons.
 */

/**
 * Initializes sidebar controls and event listeners.
 *
 * Sets up the hide and show sidebar buttons, manages sidebar visibility
 * for desktop/tablet and mobile layouts, and handles closing the sidebar
 * when clicking outside on mobile overlays.
 *
 * @returns {void}
 */
export function setupSidebar() {
  // Sidebar element containing the navigation or content to show/hide
  const sidebar = document.getElementById("side-bar-div");
  // Button that hides/collapses the sidebar
  const hideBtn = document.getElementById("hide-sidebar-btn");
  // Button that shows/opens the sidebar
  const showBtn = document.getElementById("show-sidebar-btn");
  // The document body element, used to toggle layout classes
  const body = document.body;

  if (!sidebar || !hideBtn || !showBtn) return;

  /**
   * Collapses the sidebar on desktop/tablet by adding a class to the body,
   * or closes the overlay sidebar on mobile by removing overlay classes.
   * Makes the show button visible to restore the sidebar.
   */
  const hideSidebar = () => {
    // Close overlay if open (mobile)
    sidebar.classList.remove("show-sidebar");
    body.classList.remove("menu-open");
    // Collapse layout (desktop/tablet)
    body.classList.add("sidebar-collapsed");
    showBtn.hidden = false;
  };

  /**
   * Shows or opens the sidebar.
   * On mobile, adds overlay classes to sidebar and body.
   * On desktop/tablet, removes collapsed class to expand sidebar.
   * Hides the show button when sidebar is visible.
   */
  const showSidebar = () => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (isMobile) {
      sidebar.classList.add("show-sidebar");
      body.classList.add("menu-open");
    }
    body.classList.remove("sidebar-collapsed");
    showBtn.hidden = true;
  };

  // Attach click event listeners to hide and show buttons
  // Hide button collapses or closes sidebar
  hideBtn.addEventListener("click", hideSidebar);
  // Show button opens or expands sidebar
  showBtn.addEventListener("click", showSidebar);

  /**
   * Listens for clicks outside the sidebar and buttons on mobile.
   * If the sidebar overlay is open and the click is outside the sidebar and buttons,
   * closes the overlay and shows the opener button.
   */
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

  // Initial visibility: if sidebar is visible (not display:none),
  // hide the show button to avoid redundant controls
  const sidebarVisible = window.getComputedStyle(sidebar).display !== "none";
  showBtn.hidden = sidebarVisible;
}
