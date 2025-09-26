// This module creates task card DOM elements and wires them with interactions.

import { openTaskModal } from "./modalHandlers.js";

/**
 * Creates a DOM element representing a task card.
 * @param {Object} task - The task object.
 * @param {string|number} task.id - The unique identifier of the task.
 * @param {string} task.title - The title of the task.
 * @returns {HTMLDivElement} The DOM element representing the task.
 */
export function createTaskElement(task) {
  // Create a div element and set its class to "task-div"
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";

  // Set the task title as the text content of the div
  taskDiv.textContent = task.title;

  // Store the task id as a string in a data attribute on the div
  taskDiv.dataset.taskId = task.id;

  // Add a click event listener to open the modal for this task
  taskDiv.addEventListener("click", () => {
    openTaskModal(task);
  });

  // Return the completed task element
  return taskDiv;
}
