// Capturamos los elementos del HTML
const input = document.getElementById('ingresoDatos');
const boton = document.getElementById('buscar');
const resultado = document.getElementById('resultado');

// Función que busca cervecerías
function buscarCervecerias() {
  const termino = input.value.trim(); // texto ingresado

  if (termino === '') {
    resultado.innerHTML = '<p>⚠️ Escribe algo para buscar.</p>';
    return;
  }

  const url = `https://api.openbrewerydb.org/v1/breweries/search?query=${termino}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data); // mirá en consola los datos que llegan

      if (data.length === 0) {
        resultado.innerHTML = '<p>❌ No se encontraron cervecerías.</p>';
        return;
      }

      resultado.innerHTML = data.map(b => `
        <div>
          <h3>${b.name}</h3>
          <p><strong>Ciudad:</strong> ${b.city || 'Desconocida'}</p>
          <p><strong>Estado:</strong> ${b.state || 'Desconocido'}</p>
          <p><strong>Tipo:</strong> ${b.brewery_type}</p>
          ${b.website_url ? `<a href="${b.website_url}" target="_blank">🌐 Visitar sitio</a>` : ''}
        </div>
      `).join('');
    })
    .catch(err => {
      console.error(err);
      resultado.innerHTML = '<p>🚫 Error al conectar con la API.</p>';
    });
}

// Ejecutamos la función al hacer clic
boton.addEventListener('click', buscarCervecerias);

// Y también si se presiona ENTER
input.addEventListener('keyup', e => {
  if (e.key === 'Enter') buscarCervecerias();
});
