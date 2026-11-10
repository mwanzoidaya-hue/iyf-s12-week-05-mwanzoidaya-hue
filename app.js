const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const filters = document.querySelector("#filters");
const itemsLeft = document.querySelector("#items-left");
const clearCompletedButton = document.querySelector("#clear-completed");
const emptyState = document.querySelector("#empty-state");

const STORAGE_KEY = "little-list-todos";
let todos = loadTodos();
let currentFilter = "all";
let pendingToggleTimer = null;

function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(savedTodos)) {
      return [];
    }

    return savedTodos.filter((todo) =>
      todo &&
      typeof todo.id === "string" &&
      typeof todo.text === "string" &&
      typeof todo.completed === "boolean"
    );
  } catch (error) {
    console.error("Could not load saved tasks.", error);
    return [];
  }
}

function saveTodos() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Could not save tasks in this browser.", error);
  }
}

function renderTodos() {
  const visibleTodos = todos.filter((todo) => {
    if (currentFilter === "active") {
      return !todo.completed;
    }
    if (currentFilter === "completed") {
      return todo.completed;
    }
    return true;
  });

  todoList.replaceChildren();

  visibleTodos.forEach((todo) => {
    const row = document.createElement("li");
    row.classList.add("todo-row");
    row.dataset.id = todo.id;

    if (todo.completed) {
      row.classList.add("is-completed");
    }

    const toggleButton = document.createElement("button");
    toggleButton.classList.add("task-toggle");
    toggleButton.type = "button";
    toggleButton.dataset.action = "toggle";
    toggleButton.setAttribute(
      "aria-label",
      `${todo.completed ? "Mark as active" : "Complete"}: ${todo.text}`
    );

    const check = document.createElement("span");
    check.classList.add("task-check");
    check.setAttribute("aria-hidden", "true");
    check.textContent = "✓";

    const text = document.createElement("span");
    text.classList.add("task-text");
    text.textContent = todo.text;

    toggleButton.append(check, text);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.type = "button";
    deleteButton.dataset.action = "delete";
    deleteButton.setAttribute("aria-label", `Delete ${todo.text}`);
    deleteButton.textContent = "×";

    row.append(toggleButton, deleteButton);
    todoList.append(row);
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  itemsLeft.textContent = `${activeCount} ${activeCount === 1 ? "item" : "items"} left`;
  clearCompletedButton.disabled = !todos.some((todo) => todo.completed);
  emptyState.classList.toggle("is-visible", visibleTodos.length === 0);
  todoList.hidden = visibleTodos.length === 0;
}

function addTodo(text) {
  todos.unshift({
    id: crypto.randomUUID(),
    text,
    completed: false
  });
  saveTodos();
  renderTodos();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    input.focus();
    return;
  }

  addTodo(text);
  input.value = "";
  input.focus();
});

todoList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  const row = event.target.closest(".todo-row");

  if (!button || !row || !todoList.contains(row)) {
    return;
  }

  if (button.dataset.action === "toggle") {
    window.clearTimeout(pendingToggleTimer);
    const todoId = row.dataset.id;
    pendingToggleTimer = window.setTimeout(() => {
      const todo = todos.find((item) => item.id === todoId);
      if (!todo) {
        return;
      }
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos();
      pendingToggleTimer = null;
    }, 250);
    return;
  }

  const todo = todos.find((item) => item.id === row.dataset.id);
  if (todo && button.dataset.action === "delete") {
    todos = todos.filter((item) => item.id !== todo.id);
    saveTodos();
    renderTodos();
  }
});

todoList.addEventListener("dblclick", (event) => {
  const taskText = event.target.closest(".task-text");
  const row = taskText?.closest(".todo-row");

  if (!row || !todoList.contains(row)) {
    return;
  }

  const todo = todos.find((item) => item.id === row.dataset.id);
  if (!todo) {
    return;
  }

  window.clearTimeout(pendingToggleTimer);
  pendingToggleTimer = null;

  const editInput = document.createElement("input");
  editInput.classList.add("editing-input");
  editInput.type = "text";
  editInput.maxLength = 160;
  editInput.value = todo.text;
  editInput.setAttribute("aria-label", "Edit task");
  taskText.replaceWith(editInput);
  editInput.focus();
  editInput.select();
  let editingFinished = false;

  function finishEditing(save) {
    if (editingFinished) {
      return;
    }
    editingFinished = true;

    if (save) {
      const updatedText = editInput.value.trim();
      if (updatedText) {
        todo.text = updatedText;
        saveTodos();
      }
    }
    renderTodos();
  }

  editInput.addEventListener("keydown", (keyEvent) => {
    if (keyEvent.key === "Enter") {
      keyEvent.preventDefault();
      finishEditing(true);
    } else if (keyEvent.key === "Escape") {
      finishEditing(false);
    }
  });

  editInput.addEventListener("blur", () => finishEditing(true), { once: true });
});

filters.addEventListener("click", (event) => {
  const filterButton = event.target.closest("button[data-filter]");
  if (!filterButton || !filters.contains(filterButton)) {
    return;
  }

  currentFilter = filterButton.dataset.filter;
  filters.querySelectorAll(".filter").forEach((button) => {
    const isActive = button === filterButton;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  renderTodos();
});

clearCompletedButton.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
});

renderTodos();
