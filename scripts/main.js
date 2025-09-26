/**
 * @file
 * Entry point for the Task Board app.
 * Bootstraps data fetching and storage, renders the task board,
 * and wires up all UI systems (modals, sidebar, menu, theme).
 */
import {
  loadTasksFromStorage,
  saveTasksToStorage,
} from "./utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "./ui/render.js";
import {
  setupModalCloseHandler,
  setupNewTaskModalHandler,
  setupEditModalHandlers,
} from "./ui/modalHandlers.js";
import { fetchInitialTasks } from "./api.js";
import { setupSidebar } from "./ui/sidebar.js";
import { setupMobileMenu } from "./ui/mobileMenu.js";
import { setupTheme } from "./ui/theme.js";

/**
 * Updates the status banner with a message and styling.
 * @param {string} message - The message to display in the status banner.
 * @param {string} [kind="info"] - The type of status ("info", "error", etc.) for styling.
 * @returns {void}
 */
function setStatus(message, kind = "info") {
  // Look up the status banner element in the DOM
  const el = document.getElementById("app-status");
  if (!el) return;
  // Update the text content
  el.textContent = message;
  // Set the appropriate class for styling (info, error, etc.)
  el.className = `status-banner ${kind}`;
  // Make the banner visible
  el.hidden = false;
}

/**
 * Hides and clears the status banner.
 * @returns {void}
 */
function clearStatus() {
  // Look up the status banner element in the DOM
  const el = document.getElementById("app-status");
  if (!el) return;
  // Clear the text and hide the banner
  el.textContent = "";
  el.hidden = true;
}

/**
 * Initializes the Task Board application.
 * - Sets initial loading status.
 * - Attempts to fetch tasks from the API and seeds localStorage.
 * - Falls back to localStorage if fetch fails.
 * - Renders tasks and clears status banner.
 * - Wires up UI systems: modals, sidebar, mobile menu, and theme.
 * @returns {Promise<void>}
 */
async function initTaskBoard() {
  // Set initial loading status
  setStatus("Loading tasks…", "info");

  let tasks;
  try {
    // Try to fetch fresh tasks from the API and seed localStorage
    const fetched = await fetchInitialTasks();
    saveTasksToStorage(fetched); // seed storage with fresh data
    tasks = fetched;
  } catch {
    // If fetch fails, use whatever is in localStorage as fallback
    setStatus("Couldn’t reach the task API. Showing saved tasks.", "error");
    tasks = loadTasksFromStorage();
  }

  // Render current tasks and clear the status banner
  clearExistingTasks();
  renderTasks(tasks);
  clearStatus();

  // Wire up modal close and new task modal handlers
  setupModalCloseHandler();
  setupNewTaskModalHandler();
  // Wire sidebar controls (hide / show / mobile overlay)
  setupSidebar();
  // Wire mobile menu controls (open / close)
  setupMobileMenu();
  // Wire theme toggle controls (desktop + mobile)
  setupTheme();
}

/**
 * Setup edit modal handlers outside DOMContentLoaded to ensure
 * handlers exist before DOM load. Safe to call early as it just attaches listeners.
 */
setupEditModalHandlers();

// Start initialization when DOM is fully loaded
document.addEventListener("DOMContentLoaded", initTaskBoard);
