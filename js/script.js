// Cargar el archivo JSON dinámicamente
fetch('biblia.json') 
  .then(response => response.json())
  .then(data => {
    initialize(data);
  })
  .catch(error => console.error('Error al cargar el JSON:', error));

// Elementos del DOM
const bookSelect = document.getElementById("book");
const chapterSelect = document.getElementById("chapter");
const showButton = document.getElementById("show");
const versesContainer = document.getElementById("verses");

// Inicializar la aplicación
function initialize(bible) {
  loadBooks(bible);
  bookSelect.addEventListener("change", () => loadChapters(bible));
  showButton.addEventListener("click", () => showVerses(bible));
}

// Cargar libros en el selector
function loadBooks(bible) {
  const books = Object.keys(bible["Antiguo Testamento"]);
  books.forEach(book => {
    const option = document.createElement("option");
    option.value = book;
    option.textContent = book;
    bookSelect.appendChild(option);
  });
  loadChapters(bible); 
}

// Cargar capítulos en el selector
function loadChapters(bible) {
  chapterSelect.innerHTML = ""; 
  const selectedBook = bookSelect.value;
  if (bible["Antiguo Testamento"][selectedBook]) {
    const chapters = Object.keys(bible["Antiguo Testamento"][selectedBook]);
    chapters.forEach(chapter => {
      const option = document.createElement("option");
      option.value = chapter;
      option.textContent = `Capítulo ${chapter}`;
      chapterSelect.appendChild(option);
    });
  }
}

// Mostrar versículos
function showVerses(bible) {
  const selectedBook = bookSelect.value;
  const selectedChapter = chapterSelect.value;
  const verses = bible["Antiguo Testamento"][selectedBook]?.[selectedChapter];
  versesContainer.innerHTML = ""; 
  if (verses) {
    Object.entries(verses).forEach(([verse, text]) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = `${verse}: ${text}`;
      versesContainer.appendChild(paragraph);
    });
  } else {
    versesContainer.textContent = "No hay versículos disponibles.";
  }
}
