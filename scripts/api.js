// scripts/api.js
/**
 * Try a few common endpoints to fetch initial tasks (array of task objects).
 * If all fail, we throw; the caller will fall back to localStorage.
 * @returns {Promise<Array>} tasks
 */
export async function fetchInitialTasks() {
  const API_BASE = "https://jsl-kanban-api.vercel.app";
  const candidates = [
    API_BASE,
    `${API_BASE}/tasks`,
    `${API_BASE}/api/tasks`,
  ];

  for (const url of candidates) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      const tasks = Array.isArray(data) ? data : (data.tasks || data.data || []);
      if (Array.isArray(tasks) && tasks.length) return tasks;
    } catch (_) {
      // try next candidate
    }
  }
  throw new Error("Unable to fetch tasks from API");
}
