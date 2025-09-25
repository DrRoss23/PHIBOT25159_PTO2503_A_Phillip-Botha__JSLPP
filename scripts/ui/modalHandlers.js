import { addNewTask, updateTask, deleteTask } from "../tasks/taskManager.js";

export function setupModalCloseHandler() {
  const modal = document.getElementById("task-modal");
  const closeBtn = document.getElementById("close-modal-btn");
  closeBtn.addEventListener("click", () => modal.close());
}

export function setupNewTaskModalHandler() {
  const overlay = document.querySelector(".modal-overlay");
  const newTaskBtn = document.getElementById("add-new-task-btn");
  const form = document.querySelector(".modal-window");
  const cancelBtn = document.getElementById("cancel-add-btn");

  newTaskBtn.addEventListener("click", () => {
    overlay.style.visibility = "visible";
    overlay.showModal();
  });

  cancelBtn.addEventListener("click", () => overlay.close());

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
      addNewTask();
    } else {
      form.reportValidity();
    }
  });
}

export function openTaskModal(task) {
  const modal = document.getElementById("task-modal");
  if (!modal) return;

  document.getElementById("task-id").value = String(task.id);
  document.getElementById("task-title").value = task.title || "";
  document.getElementById("task-desc").value = task.description || "";
  document.getElementById("task-status").value = task.status || "todo";

  modal.showModal();
}

export function setupEditModalHandlers() {
  const modal = document.getElementById("task-modal");
  if (!modal) return;

  const form = document.getElementById("task-form");
  const closeBtn = document.getElementById("close-modal-btn");
  const deleteBtn = document.getElementById("delete-task-btn");

  closeBtn.addEventListener("click", () => modal.close());

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const updated = {
      id: Number(document.getElementById("task-id").value),
      title: document.getElementById("task-title").value.trim(),
      description: document.getElementById("task-desc").value.trim(),
      status: document.getElementById("task-status").value,
    };
    if (!updated.title) return;
    updateTask(updated);
    modal.close();
  });

  deleteBtn.addEventListener("click", () => {
    const id = Number(document.getElementById("task-id").value);
    if (window.confirm("Delete this task? This cannot be undone.")) {
      deleteTask(id);
      modal.close();
    }
  });
}

