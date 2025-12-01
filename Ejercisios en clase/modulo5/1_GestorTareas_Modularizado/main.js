// main.js - Orquesta la app (módulo)
import { getTasks, saveTasks } from './storage.js';
import { initTasks, addTask } from './tasks.js';
import { render, handleAdd } from './ui.js';

// Inicializar tareas desde localStorage
const initial = getTasks();
initTasks(initial);
render();

// Eventos UI
document.getElementById('add-btn').addEventListener('click', () => {
  handleAdd(document.getElementById('task-input'));
});

document.getElementById('clear-btn').addEventListener('click', () => {
  // Borrar todas las tareas
  const confirmClear = confirm('¿Borrar todas las tareas?');
  if(!confirmClear) return;
  // guardar arreglo vacío
  saveTasks([]);
  // inicializar tasks (importado por referencia en tasks.js si se reimporta)
  initTasks([]);
  render();
});
