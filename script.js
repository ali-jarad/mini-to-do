// عناصر الصفحة
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

const clearCompletedBtn = document.getElementById("clearCompleted");
const filterBtns = document.querySelectorAll(".filter-btn");

// حالة التطبيق (Data Model)
let todos = []; // [{ id, text, done }]
let currentFilter = "all";

const STORAGE_KEY = "mini_todos_v1";

// ---------- Storage ----------
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadTodos() {
  const raw = localStorage.getItem(STORAGE_KEY);
  todos = raw ? JSON.parse(raw) : [];
}

// ---------- Helpers ----------
function generateId() {
  // يعمل على أغلب المتصفحات الحديثة + fallback
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return String(Date.now()) + "_" + Math.random().toString(16).slice(2);
}

// ---------- Render ----------
function render() {
  // تفريغ القائمة
  list.innerHTML = "";

  // تطبيق الفلتر
  const filtered = todos.filter((t) => {
    if (currentFilter === "active") return !t.done;
    if (currentFilter === "completed") return t.done;
    return true; // all
  });

  // رسم العناصر
  filtered.forEach((todo) => {
    list.appendChild(createTodoItem(todo));
  });
}

function createTodoItem(todo) {
  const li = document.createElement("li");
  // استخدم class موجود عندك في CSS (غيّرها إذا احتجت)
  li.className = "todo-item" + (todo.done ? " done" : "");

  const span = document.createElement("span");
  span.textContent = todo.text;
  span.style.cursor = "pointer";

  // Toggle done عند الضغط على النص
  span.addEventListener("click", () => toggleDone(todo.id));

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.textContent = "Delete";

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.textContent = "Edit";

  // حذف المهمة
  deleteBtn.addEventListener("click", (e) => {
    // منع أي تداخل مع click على العنصر
    e.stopPropagation();
    removeTodo(todo.id);
  });
  // تعديل المهمة
  // تعديل المهمة
editBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  const newText = prompt("Edit todo:", todo.text);

  // Cancel
  if (newText === null) return;

  const trimmedText = newText.trim();

  // Empty after trim
  if (!trimmedText) {
    alert("Todo text cannot be empty.");
    return;
  }

  // Same text (no change)
  if (trimmedText === todo.text) return;

  // Update (efficient)
  const idx = todos.findIndex((t) => t.id === todo.id);
  if (idx === -1) return;

  todos[idx] = { ...todos[idx], text: trimmedText };

  saveTodos();
  render();
});



  li.appendChild(span);
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);

  return li;
}

// ---------- Actions ----------
function addTodo(text) {
  const newTodo = {
    id: generateId(),
    text,
    done: false,
  };
  todos.push(newTodo);
  saveTodos();
  render();
}

function removeTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  render();
}

function toggleDone(id) {
  todos = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  saveTodos();
  render();
}

function setFilter(filter) {
  currentFilter = filter;

  // تحديث شكل الأزرار (active)
  filterBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });

  render();
}

// ---------- Events ----------
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  addTodo(text);
  input.value = "";
  input.focus();
});

clearCompletedBtn?.addEventListener("click", () => {
  todos = todos.filter((t) => !t.done);
  saveTodos();
  render();
});

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    setFilter(btn.dataset.filter);
  });
});

// ---------- Init ----------
loadTodos();
setFilter("all");
render();
