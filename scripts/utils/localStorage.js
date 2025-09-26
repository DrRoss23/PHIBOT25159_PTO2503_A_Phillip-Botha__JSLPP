/**
 * This module handles persistence of tasks to and from localStorage.
 * It provides functions to load tasks with error handling and seed with initial tasks,
 * as well as save tasks back to localStorage.
 */
import { initialTasks } from "../../initialData.js";

/**
 * Loads tasks from localStorage, handles JSON parsing errors,
 * and seeds with initialTasks if none exist.
 * @returns {Array<Object>} The array of tasks.
 */
export function loadTasksFromStorage() {
  // Retrieve stored tasks from localStorage
  const stored = localStorage.getItem("tasks");
  if (stored) {
    try {
      // Attempt to parse stored JSON string into tasks array
      return JSON.parse(stored);
    } catch (err) {
      // Log error if JSON parsing fails
      console.error("Error parsing tasks from localStorage:", err);
    }
  }

  // Initialize with initialTasks if no stored tasks exist
  localStorage.setItem("tasks", JSON.stringify(initialTasks));
  return initialTasks;
}

/**
 * Saves the given array of task objects to localStorage.
 * @param {Array<Object>} tasks - The array of tasks to save.
 */
export function saveTasksToStorage(tasks) {
  // Save tasks array as JSON string to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
