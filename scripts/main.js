// scripts/main.js
import { loadTasksFromStorage, saveTasksToStorage } from "./utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "./ui/render.js";
import { setupModalCloseHandler, setupNewTaskModalHandler, setupEditModalHandlers } from "./ui/modalHandlers.js";
import { fetchInitialTasks } from "./api.js";
import { setupSidebar } from "./ui/sidebar.js";
import { setupMobileMenu } from "./ui/mobileMenu.js";
import { setupTheme } from "./ui/theme.js";


/** Update the status banner text and show it */
function setStatus(message, kind = "info") {
  const el = document.getElementById("app-status");
  if (!el) return;
  el.textContent = message;
  el.className = `status-banner ${kind}`;
  el.hidden = false;
}

/** Hide the status banner */
function clearStatus() {
  const el = document.getElementById("app-status");
  if (!el) return;
  el.textContent = "";
  el.hidden = true;
}

async function initTaskBoard() {
  setStatus("Loading tasks…", "info");

  let tasks;
  try {
    // Try to fetch fresh tasks from the API
    const fetched = await fetchInitialTasks();
    saveTasksToStorage(fetched); // seed storage with fresh data
    tasks = fetched;
  } catch {
    // If fetch fails, use whatever is in localStorage
    setStatus("Couldn’t reach the task API. Showing saved tasks.", "error");
    tasks = loadTasksFromStorage();
  }

  // Render current tasks and clear the banner
  clearExistingTasks();
  renderTasks(tasks);
  clearStatus();

  // Keep existing modal hooks working
  setupModalCloseHandler();
  setupNewTaskModalHandler();
  // wire sidebar controls (hide / show / mobile overlay)
  setupSidebar();
 // wire mobile menu controls (open / close)
  setupMobileMenu();
  // wire theme toggle controls (desktop + mobile)
  setupTheme();
}

setupEditModalHandlers();

document.addEventListener("DOMContentLoaded", initTaskBoard);

