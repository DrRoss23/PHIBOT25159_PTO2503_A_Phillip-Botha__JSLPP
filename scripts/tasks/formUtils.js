// Utility functions for task form handling.
// This file contains helper functions to manage and manipulate form elements related to tasks.

/**
 * Resets the task form inputs to their default states.
 * This function clears the title and description fields and sets the status selector to "todo".
 *
 * @returns {void} No parameters or return value.
 */
export function resetForm() {
  // Clear the value of the title input field
  document.getElementById("title-input").value = "";
  // Clear the value of the description input field
  document.getElementById("desc-input").value = "";
  // Set the status dropdown to the default option "todo"
  document.getElementById("select-status").value = "todo";
}
