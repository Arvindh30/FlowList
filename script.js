// script.js

const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
const filters = document.querySelectorAll('.filter');
const clearBtn = document.getElementById('clear-all');
const themeToggle = document.getElementById('theme-toggle');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let filter = 'all';

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = '';
  const filtered = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
  });
  filtered.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';
    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${todo.text}</span>
      <button onclick="deleteTodo(${index})">&times;</button>
    `;
    list.appendChild(li);
  });
  saveTodos();
}

function addTodo() {
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, completed: false });
  input.value = '';
  renderTodos();
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function clearAll() {
  todos = [];
  renderTodos();
}

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filter = btn.getAttribute('data-filter');
    renderTodos();
  });
});

addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTodo();
});
clearBtn.addEventListener('click', clearAll);

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Initial render
renderTodos();
