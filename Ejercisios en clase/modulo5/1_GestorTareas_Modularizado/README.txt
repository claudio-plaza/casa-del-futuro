Gestor de Tareas - Modularizado
---------------------------------
Arquitectura:
- storage.js -> persistencia en localStorage
- tasks.js   -> lógica de negocio (crear, eliminar, toggle)
- ui.js      -> render y conexión con el DOM
- main.js    -> orquesta inicialización y eventos

Cómo abrir:
1. Abrir 'index.html' en el navegador (doble clic).
2. Usar la caja de texto y el botón 'Agregar' para crear tareas.
3. Las tareas se guardan automáticamente en localStorage.

Conceptos aplicados:
- ES Modules (import / export)
- Separación de responsabilidades
- localStorage
- DOM manipulation

Profesor: Prof. González, Silvia - Casa del Futuro
