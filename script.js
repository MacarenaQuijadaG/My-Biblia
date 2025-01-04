document.addEventListener("DOMContentLoaded", function() {
  const libroSelect = document.getElementById('libro');
  const capituloSelect = document.getElementById('capitulo');
  const versiculoContainer = document.getElementById('versiculo-container');

  let libros = {}; // Definimos la variable global

  // Cargar todos los libros de la biblia
  fetch('libros.json')
    .then(response => response.json())
    .then(data => {
      libros = data; // Asignamos los datos a la variable global libros
      // Agregar los libros al selector
      Object.keys(libros).forEach(libro => {
        const option = document.createElement('option');
        option.value = libro;
        option.textContent = libro;
        libroSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error al cargar los libros:', error));

  libroSelect.addEventListener('change', function() {
    const libroSeleccionado = libroSelect.value;
    if (libroSeleccionado) {
      cargarCapitulos(libroSeleccionado);
    }
  });

  capituloSelect.addEventListener('change', function() {
    const libroSeleccionado = libroSelect.value;
    const capituloSeleccionado = capituloSelect.value;
    if (libroSeleccionado && capituloSeleccionado) {
      cargarVersiculos(libroSeleccionado, capituloSeleccionado);
    }
  });

  function cargarCapitulos(libro) {
    fetch(libros[libro]) // Cargar el archivo JSON del libro seleccionado
      .then(response => response.json())
      .then(data => {
        capituloSelect.innerHTML = '<option value="">Seleccionar capítulo</option>';
        const capitulos = Object.keys(data);
        capitulos.forEach(capitulo => {
          const option = document.createElement('option');
          option.value = capitulo;
          option.textContent = `Capítulo ${capitulo}`;
          capituloSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error al cargar los capítulos:', error));
  }

  function cargarVersiculos(libro, capitulo) {
    fetch(libros[libro]) // Cargar el archivo JSON del libro seleccionado
      .then(response => response.json())
      .then(data => {
        const versiculos = data[capitulo];
        versiculoContainer.innerHTML = ''; // Limpiar contenedor de versículos
        Object.keys(versiculos).forEach(versiculo => {
          const p = document.createElement('p');
          p.textContent = `${versiculo}. ${versiculos[versiculo]}`;
          versiculoContainer.appendChild(p);
        });
      })
      .catch(error => console.error('Error al cargar los versículos:', error));
  }
});
