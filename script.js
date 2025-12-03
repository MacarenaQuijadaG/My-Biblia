document.addEventListener("DOMContentLoaded", function() {
  const libroSelect = document.getElementById('libro');
  const capituloSelect = document.getElementById('capitulo');
  const versiculoContainer = document.getElementById('versiculo-container');

  let textosBiblicos = {}; 

  // Cargar los textos bíblicos desde un nuevo JSON
  fetch('textos-biblicos.json')
    .then(response => response.json())
    .then(data => {
      textosBiblicos = data; 
      Object.keys({...textosBiblicos.antiguoTestamento, ...textosBiblicos.nuevoTestamento}).forEach(libro => {
        const option = document.createElement('option');
        option.value = libro;
        option.textContent = libro;
        libroSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error al cargar los textos:', error));

  libroSelect.addEventListener('change', function() {
    const libroSeleccionado = libroSelect.value;
    if (libroSeleccionado) {
      cargarSecciones(libroSeleccionado);
    }
  });

  capituloSelect.addEventListener('change', function() {
    const libroSeleccionado = libroSelect.value;
    const capituloSeleccionado = capituloSelect.value;
    if (libroSeleccionado && capituloSeleccionado) {
      mostrarTexto(libroSeleccionado, capituloSeleccionado);
    }
  });
// Carga de los libros 
  function cargarSecciones(libro) {
    const testamento = textosBiblicos.antiguoTestamento[libro] ? 'antiguoTestamento' : 'nuevoTestamento';
    fetch(textosBiblicos[testamento][libro]) 
      .then(response => response.json())
      .then(data => {
        capituloSelect.innerHTML = '<option value="">Seleccionar sección</option>';
        Object.keys(data).forEach(capitulo => {
          const option = document.createElement('option');
          option.value = capitulo;
          option.textContent = `Sección ${capitulo}`;
          capituloSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error al cargar las secciones:', error));
  }

  function mostrarTexto(libro, capitulo) {
    const testamento = textosBiblicos.antiguoTestamento[libro] ? 'antiguoTestamento' : 'nuevoTestamento';
    fetch(textosBiblicos[testamento][libro])
      .then(response => response.json())
      .then(data => {
        const contenido = data[capitulo];
        versiculoContainer.innerHTML = ''; 
        Object.keys(contenido).forEach(versiculo => {
          const p = document.createElement('p');
          p.textContent = `${versiculo}. ${contenido[versiculo]}`;
          versiculoContainer.appendChild(p);
        });
      })
      .catch(error => console.error('Error al cargar el texto:', error));
  }
});
