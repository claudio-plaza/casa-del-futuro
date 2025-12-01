const pokemonName = document.getElementById("pokemonName");
const pokemonImg = document.getElementById("pokemonImg");
const newPokemonBtn = document.getElementById("newPokemon");

async function getPokemon() {
  try {
    const id = Math.floor(Math.random() * 898) + 1; // ID Pokémon 1-898
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    pokemonName.textContent = data.name.toUpperCase();
    pokemonImg.src = data.sprites.front_default;
  } catch(err) {
    console.error(err);
    pokemonName.textContent = "Error al cargar Pokémon 😕";
    pokemonImg.src = "";
  }
}

newPokemonBtn.addEventListener("click", getPokemon);
getPokemon();
