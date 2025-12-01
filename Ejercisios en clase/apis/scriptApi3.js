const jokeText = document.getElementById("joke");
const newJokeBtn = document.getElementById("newJoke");

async function getJoke() {
  try {
    const res = await fetch("https://v2.jokeapi.dev/joke/Any?lang=es");
    const data = await res.json();
    if(data.type === "single") {
      jokeText.textContent = data.joke;
    } else {
      jokeText.textContent = `${data.setup} ... ${data.delivery}`;
    }
  } catch(err) {
    console.error("Error:", err);
    jokeText.textContent = "No se pudo cargar el chiste 😕";
  }
}

newJokeBtn.addEventListener("click", getJoke);
getJoke();
