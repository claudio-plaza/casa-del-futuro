const input = document.getElementById("nuevaTarea");
const botonAgregar = document.getElementById("agregarBtn");
const lista = document.getElementById("listaTareas");
const botonLimpiar = document.getElementById("limpiarTodo");

// Cargar tareas guardadas al iniciar
document.addEventListener("DOMContentLoaded", cargarTareas);

// Agregar tarea
botonAgregar.addEventListener("click", () => {
  const texto = input.value.trim();
  if (texto === "") return;

  agregarTarea(texto);
  guardarTareas();
  input.value = "";
});

function agregarTarea(texto, completada = false) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const botonEliminar = document.createElement("button");

  span.textContent = texto;
  botonEliminar.textContent = "Eliminar";

  if (completada) li.classList.add("completada");

  // Alternar estado completado
  span.addEventListener("click", () => {
    li.classList.toggle("completada");
    guardarTareas();
  });

  // Eliminar tarea
  botonEliminar.addEventListener("click", () => {
    li.remove();
    guardarTareas();
  });

  li.appendChild(span);
  li.appendChild(botonEliminar);
  lista.appendChild(li);
}

// Guardar en localStorage
function guardarTareas() {
  const tareas = [];
  lista.querySelectorAll("li").forEach(li => {
    tareas.push({
      texto: li.querySelector("span").textContent,
      completada: li.classList.contains("completada")
    });
  });
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Cargar desde localStorage
function cargarTareas() {
  const guardadas = JSON.parse(localStorage.getItem("tareas")) || [];
  guardadas.forEach(t => agregarTarea(t.texto, t.completada));
}

// Borrar todas
botonLimpiar.addEventListener("click", () => {
  lista.innerHTML = "";
  guardarTareas();
});
