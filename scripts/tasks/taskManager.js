import {
  loadTasksFromStorage,
  saveTasksToStorage,
} from "../utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "../ui/render.js";
import { resetForm } from "./formUtils.js";

export function addNewTask() {
  const title = document.getElementById("title-input").value.trim();
  const description = document.getElementById("desc-input").value.trim();
  const status = document.getElementById("select-status").value;
  const overlay = document.querySelector(".modal-overlay");

  if (!title) return;

  const tasks = loadTasksFromStorage();
  const newTask = {
    id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    title,
    description,
    status,
  };

  const updatedTasks = [...tasks, newTask];
  saveTasksToStorage(updatedTasks);

  clearExistingTasks();
  renderTasks(updatedTasks);
  resetForm();
  overlay.close();
}

/** Update an existing task and refresh the board */
export function updateTask(updated) {
  const tasks = loadTasksFromStorage();
  const idx = tasks.findIndex((t) => t.id === updated.id);
  if (idx === -1) return;

  tasks[idx] = { ...tasks[idx], ...updated };
  saveTasksToStorage(tasks);

  clearExistingTasks();
  renderTasks(tasks);
}

/** Delete a task by id and refresh the board */
export function deleteTask(id) {
  const tasks = loadTasksFromStorage().filter((t) => t.id !== id);
  saveTasksToStorage(tasks);

  clearExistingTasks();
  renderTasks(tasks);
}
