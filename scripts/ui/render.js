/**
 * Module responsible for rendering tasks into the DOM and clearing them.
 */

import { createTaskElement } from "./taskElement.js";

/**
 * Finds the task container element based on task status.
 * @param {string} status - The status of the task (todo, doing, done).
 * @returns {HTMLElement|null} The container element for the given status or null if not found.
 */
function getTaskContainerByStatus(status) {
  // Select the column div that matches the given status
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  // Return the tasks container inside the column if found, otherwise null
  return column ? column.querySelector(".tasks-container") : null;
}

/**
 * Clears all existing task-divs from all task containers.
 * Loops through all containers and clears their content.
 */
export function clearExistingTasks() {
  // Select all elements with class 'tasks-container' and iterate over them
  document.querySelectorAll(".tasks-container").forEach((container) => {
    // Clear the inner HTML of each container to remove all task elements
    container.innerHTML = "";
  });
}

/**
 * Renders tasks to their appropriate columns.
 * @param {Array} tasks - Array of task objects to render.
 * Creates task elements and appends them to the correct container based on status.
 */
export function renderTasks(tasks) {
  // Iterate over each task in the provided array
  tasks.forEach((task) => {
    // Find the container element that corresponds to the task's status
    const container = getTaskContainerByStatus(task.status);
    if (container) {
      // Create a DOM element for the task
      const taskElement = createTaskElement(task);
      // Append the created task element to the container
      container.appendChild(taskElement);
    }
  });
}
