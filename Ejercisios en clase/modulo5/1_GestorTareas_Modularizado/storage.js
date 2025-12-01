// storage.js - persistencia en localStorage (módulo)
// Funciones para obtener y guardar tareas en localStorage.
// Comentarios explicativos incluidos para los alumnos.

export const getTasks = () => {
  // Intentamos parsear el valor guardado; si no existe, devolvemos array vacío
  try {
    const raw = localStorage.getItem('tasks');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error leyendo localStorage', e);
    return [];
  }
};

export const saveTasks = (tasks) => {
  // Convertimos a JSON y guardamos en localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
