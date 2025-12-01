const pantalla = document.getElementById("pantalla");
const botones = document.querySelectorAll("button");

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const valor = boton.textContent;

    if (valor === "=") {
      try {
        pantalla.value = eval(pantalla.value);
      } catch {
        pantalla.value = "Error";
      }
    } else {
      pantalla.value += valor;
    } if (valor === "C") {
      pantalla.value = "";
    }
  });
});

//Desafío: agrega un botón "C" para borrar la pantalla.