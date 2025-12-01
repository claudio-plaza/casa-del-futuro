const input = document.getElementById("nuevaTarea");
const boton = document.getElementById("agregarBtn");
const lista = document.getElementById("listaTareas");

boton.addEventListener("click", () => {
  const texto = input.value.trim();
  if (texto === "") return;

  // Crear elementos dinámicamente
  const li = document.createElement("li");
  const span = document.createElement("span");
  const botonEliminar = document.createElement("button");

  span.textContent = texto;
  botonEliminar.textContent = "Eliminar";

  // Acción de eliminar tarea
  botonEliminar.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(botonEliminar);
  lista.appendChild(li);

  input.value = ""; // limpiar campo
});
