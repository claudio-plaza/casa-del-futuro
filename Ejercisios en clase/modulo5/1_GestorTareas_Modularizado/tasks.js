// tasks.js - lógica de negocio (módulo)
// Mantiene el estado local (tasks) y exporta funciones puras de manipulación.

let tasks = [];

// Inicializa el arreglo interno con las tareas cargadas desde storage
export const initTasks = (initial) => {
  tasks = Array.isArray(initial) ? initial : [];
};

// Devuelve copia de las tareas (para evitar mutaciones externas)
export const loadTasks = () => tasks.slice();

// Crea y agrega una tarea
export const addTask = (text) => {
  const task = { id: Date.now(), text, done: false };
  tasks.push(task);
  return task;
};

// Elimina una tarea por id
export const removeTask = (id) => {
  tasks = tasks.filter(t => t.id !== id);
};

// Alterna estado done
export const toggleTask = (id) => {
  const t = tasks.find(x => x.id === id);
  if (t) t.done = !t.done;
};
