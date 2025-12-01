    const btn = document.getElementById('gatoNuevo');
    const img = document.getElementById('GatoAleatorio');

    async function getCatImage() {
      try {
        const res = await fetch('https://api.thecatapi.com/v1/images/search');
        const data = await res.json();
        img.src = data[0].url;
      } catch (error) {
        console.error('Error al obtener el gato:', error);
      }
    }

    // Mostrar un gato apenas se carga la página
    getCatImage();

    // Nuevo gato al hacer clic
    btn.addEventListener('click', getCatImage);