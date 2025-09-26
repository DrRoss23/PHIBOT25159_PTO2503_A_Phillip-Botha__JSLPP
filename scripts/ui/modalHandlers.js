/**
 * This module manages modal dialogs for adding, editing, and deleting tasks.
 * It provides functions to wire up modal open/close handlers, form submissions,
 * and prefill modals for editing tasks.
 */
import { addNewTask, updateTask, deleteTask } from "../tasks/taskManager.js";

/**
 * Sets up the handler to close the task modal dialog when the close button is clicked.
 * Wires up the close button in the modal to close the modal dialog.
 * @returns {void}
 */
export function setupModalCloseHandler() {
  // Select the modal dialog element and the close button
  const modal = document.getElementById("task-modal");
  const closeBtn = document.getElementById("close-modal-btn");
  // Add click event listener to close the modal when the button is clicked
  closeBtn.addEventListener("click", () => modal.close());
}

/**
 * Wires up the "Add New Task" modal dialog.
 * Handles opening the modal, closing/cancelling, and submitting the new task form.
 * When the form is submitted and valid, calls addNewTask().
 * @returns {void}
 */
export function setupNewTaskModalHandler() {
  // Select the modal overlay element for the new task dialog
  const overlay = document.querySelector(".modal-overlay");
  // Select the button that opens the new task modal
  const newTaskBtn = document.getElementById("add-new-task-btn");
  // Select the form inside the modal window
  const form = document.querySelector(".modal-window");
  // Select the cancel button inside the modal
  const cancelBtn = document.getElementById("cancel-add-btn");

  // Open the new task modal when the add button is clicked
  newTaskBtn.addEventListener("click", () => {
    overlay.style.visibility = "visible";
    overlay.showModal();
  });

  // Close the modal when cancel is clicked
  cancelBtn.addEventListener("click", () => overlay.close());

  // Handle form submission for adding a new task
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // If form is valid, add the new task
    if (form.checkValidity()) {
      addNewTask();
    } else {
      // Otherwise, show validation errors
      form.reportValidity();
    }
  });
}

/**
 * Opens the task modal dialog for editing a task, prefilling its fields.
 * @param {Object} task - The task object to edit.
 * @param {number} task.id - The task's unique identifier.
 * @param {string} task.title - The task's title.
 * @param {string} [task.description] - The task's description.
 * @param {string} [task.status] - The task's status (e.g., "todo", "done").
 * @returns {void}
 */
export function openTaskModal(task) {
  // Get the modal dialog element
  const modal = document.getElementById("task-modal");
  if (!modal) return;

  // Prefill the modal input fields with the task's current data
  document.getElementById("task-id").value = String(task.id); // Set task ID
  document.getElementById("task-title").value = task.title || ""; // Set title
  document.getElementById("task-desc").value = task.description || ""; // Set description
  document.getElementById("task-status").value = task.status || "todo"; // Set status, default to "todo"

  // Show the modal dialog
  modal.showModal();
}

/**
 * Wires up the edit task modal dialog for handling form submission and task deletion.
 * Handles submitting the edit form, updating the task, and confirming deletion.
 * @returns {void}
 */
export function setupEditModalHandlers() {
  // Get the modal dialog element
  const modal = document.getElementById("task-modal");
  if (!modal) return;

  // Select the form inside the modal for editing tasks
  const form = document.getElementById("task-form");
  // Select the close button in the modal
  const closeBtn = document.getElementById("close-modal-btn");
  // Select the delete button in the modal
  const deleteBtn = document.getElementById("delete-task-btn");

  // Close the modal when the close button is clicked
  closeBtn.addEventListener("click", () => modal.close());

  // Handle form submission for editing a task
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Build updated task object from form fields
    const updated = {
      id: Number(document.getElementById("task-id").value),
      title: document.getElementById("task-title").value.trim(),
      description: document.getElementById("task-desc").value.trim(),
      status: document.getElementById("task-status").value,
    };
    // Do not update if the title is empty
    if (!updated.title) return;
    // Update the task and close the modal
    updateTask(updated);
    modal.close();
  });

  // Handle task deletion with confirmation dialog
  deleteBtn.addEventListener("click", () => {
    const id = Number(document.getElementById("task-id").value);
    // Confirm before deleting the task
    if (window.confirm("Delete this task? This cannot be undone.")) {
      deleteTask(id);
      modal.close();
    }
  });
}
