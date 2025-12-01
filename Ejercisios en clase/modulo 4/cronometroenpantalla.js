let segundos = 0;
let intervalo;

function actualizarCronometro() {
  const hrs = String(Math.floor(segundos / 3600)).padStart(2, "0");
  const mins = String(Math.floor((segundos % 3600) / 60)).padStart(2, "0");
  const secs = String(segundos % 60).padStart(2, "0");

  document.getElementById("cronometro").textContent = `${hrs}:${mins}:${secs}`;
}

document.getElementById("iniciar").addEventListener("click", () => {
  if (!intervalo) {
    intervalo = setInterval(() => {
      segundos++;
      actualizarCronometro();
    }, 1000);
  }
});

document.getElementById("pausar").addEventListener("click", () => {
  clearInterval(intervalo);
  intervalo = null;
});

document.getElementById("reiniciar").addEventListener("click", () => {
  segundos = 0;
  actualizarCronometro();
  clearInterval(intervalo);
  intervalo = null;
});
