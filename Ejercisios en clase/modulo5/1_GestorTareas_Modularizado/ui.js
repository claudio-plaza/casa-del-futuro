// ui.js - render y manejo de eventos UI (módulo)
import { addTask, removeTask, toggleTask, loadTasks } from './tasks.js';
import { saveTasks } from './storage.js';

// Referencias UI
const listEl = document.getElementById('task-list');

export const render = () => {
  // Limpiar lista
  listEl.innerHTML = '';
  // Obtener tareas actuales (copia para evitar efecto directo)
  const tasks = loadTasks();
  // Renderizar cada tarea
  tasks.forEach(t => {
    const li = document.createElement('li');
    li.className = 'task-item' + (t.done ? ' done' : '');
    li.dataset.id = t.id;

    const text = document.createElement('span');
    text.textContent = t.text;

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const btnToggle = document.createElement('button');
    btnToggle.textContent = t.done ? '↺' : '✔';
    btnToggle.title = 'Marcar/Desmarcar';
    btnToggle.onclick = () => {
      toggleTask(t.id);
      // Guardar después del cambio
      saveTasks(loadTasks());
      render();
    };

    const btnDel = document.createElement('button');
    btnDel.textContent = '✖';
    btnDel.title = 'Eliminar';
    btnDel.onclick = () => {
      removeTask(t.id);
      saveTasks(loadTasks());
      render();
    };

    actions.appendChild(btnToggle);
    actions.appendChild(btnDel);

    li.appendChild(text);
    li.appendChild(actions);
    listEl.appendChild(li);
  });
};

// Manejar "Agregar" desde input (usa addTask y persiste)
export const handleAdd = (inputEl) => {
  const text = inputEl.value.trim();
  if (!text) {
    inputEl.focus();
    return;
  }
  addTask(text);
  // guardar en localStorage
  saveTasks(loadTasks());
  inputEl.value = '';
  render();
};
