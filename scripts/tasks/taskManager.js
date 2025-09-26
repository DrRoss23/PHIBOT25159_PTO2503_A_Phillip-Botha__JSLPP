/**
 * This module manages task CRUD operations: adding, updating, and deleting tasks.
 * It interacts with local storage and updates the UI accordingly.
 */
import {
  loadTasksFromStorage,
  saveTasksToStorage,
} from "../utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "../ui/render.js";
import { resetForm } from "./formUtils.js";

/**
 * Reads form inputs to create a new task, saves it to storage,
 * updates the UI, resets the form, and closes the modal overlay.
 * @returns {void}
 */
export function addNewTask() {
  // Read values from form inputs
  const title = document.getElementById("title-input").value.trim();
  const description = document.getElementById("desc-input").value.trim();
  const status = document.getElementById("select-status").value;
  const overlay = document.querySelector(".modal-overlay");

  // Return early if title is empty
  if (!title) return;

  // Load existing tasks from storage
  const tasks = loadTasksFromStorage();

  // Generate a new unique ID for the task
  const newTask = {
    id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    title,
    description,
    status,
  };

  // Add the new task to the list and save to storage
  const updatedTasks = [...tasks, newTask];
  saveTasksToStorage(updatedTasks);

  // Clear current tasks and render updated list
  clearExistingTasks();
  renderTasks(updatedTasks);

  // Reset the form inputs
  resetForm();

  // Close the modal overlay
  overlay.close();
}

/**
 * Updates an existing task with new data and refreshes the task board.
 * @param {Object} updated - The updated task object containing at least an id property.
 * @returns {void}
 */
export function updateTask(updated) {
  // Load existing tasks from storage
  const tasks = loadTasksFromStorage();

  // Find the index of the task to update
  const idx = tasks.findIndex((t) => t.id === updated.id);
  if (idx === -1) return; // Task not found

  // Update the task at the found index with new data
  tasks[idx] = { ...tasks[idx], ...updated };

  // Save the updated tasks array back to storage
  saveTasksToStorage(tasks);

  // Clear current tasks and render updated list
  clearExistingTasks();
  renderTasks(tasks);
}

/**
 * Deletes a task by its ID and refreshes the task board.
 * @param {number} id - The ID of the task to delete.
 * @returns {void}
 */
export function deleteTask(id) {
  // Filter out the task with the specified ID
  const tasks = loadTasksFromStorage().filter((t) => t.id !== id);

  // Save the filtered tasks array back to storage
  saveTasksToStorage(tasks);

  // Clear current tasks and render updated list
  clearExistingTasks();
  renderTasks(tasks);
}
