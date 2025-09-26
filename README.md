# JSLPP Task Management Portfolio Piece

## Overview

This portfolio project is built on top of the JSL05 task management solution, enhancing it with additional features and improvements. It is a modular JavaScript application that extends the previous iteration (JSL05) by incorporating persistent storage, dynamic rendering, and an interactive user interface. The application allows users to create, view, and organize tasks efficiently, with data saved across browser sessions.

The design emphasizes clean architecture, separation of concerns, and scalability, providing a strong foundation for further feature expansion.

## Relation to JSL05

This portfolio piece (JSLPP) extends the baseline JSL05 solution in the following ways:

- **Documentation & Maintainability**: Adds comprehensive file-level headers, JSDoc function docs, and inline comments across modules to support readability and assessment (Step 5).
- **UI/UX Polishing**: Clarified layout semantics, added status banner messaging, and standardized sidebar/mobile menu interactions.
- **Theming**: Implemented a synchronized light/dark mode toggle for desktop and mobile with persisted preference.
- **Structure & Imports**: Normalized module boundaries across `ui/`, `tasks/`, and `utils/`, ensuring clear ownership and orchestration via `main.js`.
- **Error Handling**: Hardened API/localStorage flows with defensive checks and graceful fallbacks when the network is unavailable.

---

## Features

- **Modular Codebase**: The logic is organized into distinct modules for UI rendering, task management, utilities, and modal handling.
- **Persistent Storage**: All tasks are saved to and loaded from `localStorage`, ensuring data persistence across page reloads.
- **Dynamic Task Rendering**: Tasks are displayed dynamically in columns based on their status.
- **Task Creation Modal**: Users can add new tasks through a modal form with validation.
- **Task Preview Modal**: Clicking on a task displays its details in a read-only modal.
- **Responsive UI**: The interface adapts well across different screen sizes.

---

## Learning Goals

By working with this portfolio project, you will learn how to:

- Structure JavaScript applications using ES6 modules (`import`/`export`).
- Use `localStorage` as a persistent data store.
- Dynamically render DOM elements based on application state.
- Implement modals for user interaction and form submission.
- Apply separation of concerns for maintainable and scalable code.
- Handle user input validation and form reset logic.
- Manage event listeners efficiently across components.

---

## File Structure

```
├── index.html             # Main HTML layout with columns and modals
├── styles.css             # CSS styles for layout, modals, and tasks
├── initialData.js         # Seed data used on first load if localStorage is empty
├── README.md              # Project documentation (this file)
├── /scripts
│   ├── main.js            # Entry point: initializes app and attaches event handlers
│   ├── api.js             # Handles fetching initial tasks from remote API with fallbacks
│   ├── /ui
│   │   ├── render.js      # Functions to render and clear tasks in UI columns
│   │   ├── taskElement.js # Creates individual task DOM elements
│   │   └── modalHandlers.js # Logic for opening/closing modals and modal interactions
│   ├── /tasks
│   │   ├── taskManager.js # Task creation, updating, and localStorage synchronization
│   │   └── formUtils.js   # Utilities for form validation and resetting
│   └── /utils
│       └── localStorage.js # Abstractions for reading/writing tasks to localStorage
```

---

## Technical Details

- **JavaScript Modules**: The app uses ES6 modules to separate concerns and promote reusability.
- **LocalStorage Integration**: Tasks are serialized as JSON and stored under a dedicated key.
- **DOM Manipulation**: Task elements are created dynamically and inserted into the correct status columns.
- **Event Handling**: Event listeners are attached for modal open/close, form submission, and task preview.
- **Form Validation**: Basic validation ensures required fields are completed before submission.
- **Modal Implementation**: Custom modal dialogs are controlled via JavaScript for task creation and preview.
- **API Integration**: On startup, the app attempts to fetch tasks from a remote API (`https://jsl-kanban-api.vercel.app`). If the API is unavailable, it falls back to localStorage or seeded data.

---

## Maintainability

This portfolio project follows best practices to ensure maintainability:

- **Clear Module Boundaries**: Each module has a single responsibility, making it easier to locate and update code.
- **Descriptive Naming**: Functions and variables are named for clarity.
- **Reusable Components**: Task elements and modal handlers can be extended or reused in future features.
- **Consistent Style**: Code formatting and commenting support readability.
- **Extensibility**: The structure supports adding features such as task editing, deletion, or filtering without major refactoring.

---

## How to Run

1. **Clone or download** the repository to your local machine.
2. Open the `index.html` file using a modern web browser or use a development server such as **Live Server** in VSCode.
   - **Note:** On startup, the app attempts to fetch tasks from the `API`. If the `API` is unavailable, it will fall back to `localStorage` or seeded data.
3. Interact with the app by:
   - Clicking the “Add New Task” button to open the creation modal.
   - Filling out the form and submitting to add a new task.
   - Clicking task cards to view details in a preview modal.
4. Refresh the page to verify that tasks persist using `localStorage`.

---

## Loom Video

A walkthrough video demonstrating the project features and code structure is available here:

[**Watch the Loom Video**](#)  
1. https://www.loom.com/share/48336ec2d7bc4fddac9c017db3cc547a?sid=4202d4f4-eec8-49e3-94f7-5a4d594eddf4

2. https://www.loom.com/share/3de9a0e3706a4a68b938757ddcf114e2?sid=484be172-a405-44b3-872e-5695b5e01b1a

---

## License

This project is provided for **educational purposes only**.

---

## Module Overview

| File/Function      | Responsibility                                                               |
| ------------------ | ---------------------------------------------------------------------------- |
| `main.js`          | Initializes task board on DOM load and sets up event handlers                |
| `render.js`        | Renders and clears tasks in the appropriate UI columns                       |
| `taskElement.js`   | Creates individual `.task-div` elements with event handlers                  |
| `modalHandlers.js` | Manages modal open/close logic and modal interactions                        |
| `taskManager.js`   | Handles task creation, updates, and localStorage syncing                     |
| `formUtils.js`     | Provides utilities for form validation and resetting                         |
| `localStorage.js`  | Reads and writes the task list to/from `localStorage`                        |
| `initialData.js`   | Supplies fallback seed data for first-time app load                          |
| `api.js`           | Handles fetching initial tasks from remote API with fallback to localStorage |
