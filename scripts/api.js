// scripts/api.js
/**
 * Module for fetching initial tasks from a remote API.
 * Attempts multiple fallback endpoints to retrieve an array of task objects.
 * If all attempts fail, an error is thrown for the caller to handle.
 */

/**
 * Fetch initial tasks from various API endpoints with fallback.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of task objects.
 * @throws {Error} Throws an error if unable to fetch tasks from any endpoint.
 */
export async function fetchInitialTasks() {
  // Base API URL and list of candidate endpoints to try fetching tasks from
  const API_BASE = "https://jsl-kanban-api.vercel.app";
  const candidates = [API_BASE, `${API_BASE}/tasks`, `${API_BASE}/api/tasks`];

  // Attempt to fetch tasks from each candidate URL in order
  for (const url of candidates) {
    try {
      // Try fetching from the current URL
      const res = await fetch(url);
      // If response is not ok, skip to next candidate
      if (!res.ok) continue;

      // Parse response JSON
      const data = await res.json();
      // Handle possible data structures: raw array, or wrapped in {tasks: []} or {data: []}
      const tasks = Array.isArray(data) ? data : data.tasks || data.data || [];

      // If we have a valid non-empty array of tasks, return it
      if (Array.isArray(tasks) && tasks.length) return tasks;
      // Otherwise, continue to next candidate
    } catch (_) {
      // Fail silently and proceed to try the next candidate URL
    }
  }
  // If all endpoints fail, throw an error to notify caller
  throw new Error("Unable to fetch tasks from API");
}
