// main.js - UI y orquestación de la Biblioteca
import { initLibrary, loadBooks, addBook, removeBook, borrowBook, returnBook, sortByYear } from './library.js';

// Helpers de storage (simple)
const LS_KEY = 'biblioteca_v2';
const save = (arr) => localStorage.setItem(LS_KEY, JSON.stringify(arr));
const load = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || []; }
  catch (e) { return []; }
};

const listEl = document.getElementById('library-list');

const render = () => {
  listEl.innerHTML = '';
  const books = loadBooks();
  if (books.length === 0) {
    listEl.innerHTML = '<p>No hay libros. Agregá el primero.</p>';
    return;
  }
  books.forEach(b => {
    const el = document.createElement('div');
    el.className = 'book-card';
    el.innerHTML = `
      <div class="meta">
        <strong>${b.title}</strong>
        <small>${b.author.name} • ${b.year}</small>
        <small>Copias disponibles: ${b.availableCopies()}</small>
      </div>
      <div class="book-actions">
        <button class="btn-borrow" data-id="${b.id}">📚 Pedir</button>
        <button class="btn-return" data-id="${b.id}">↩️ Devolver</button>
        <button class="btn-del" data-id="${b.id}">✖</button>
      </div>
    `;
    listEl.appendChild(el);
  });

  // asignar eventos
  document.querySelectorAll('.btn-borrow').forEach(btn => {
    btn.onclick = () => {
      const id = Number(btn.dataset.id);
      try { borrowBook(id); save(loadBooks()); render(); }
      catch(e){ alert(e.message); }
    };
  });
  document.querySelectorAll('.btn-return').forEach(btn => {
    btn.onclick = () => {
      const id = Number(btn.dataset.id);
      returnBook(id); save(loadBooks()); render();
    };
  });
  document.querySelectorAll('.btn-del').forEach(btn => {
    btn.onclick = () => {
      const id = Number(btn.dataset.id);
      if(confirm('Eliminar libro?')) { removeBook(id); save(loadBooks()); render(); }
    };
  });
};

// Inicialización
initLibrary(load()); // reconstruye instancias desde localStorage
render();

// Eventos UI (agregar)
document.getElementById('add-book').addEventListener('click', () => {
  const title = document.getElementById('book-title').value.trim();
  const author = document.getElementById('book-author').value.trim();
  const year = document.getElementById('book-year').value.trim();
  const copies = document.getElementById('book-copies').value.trim();
  if(!title || !author) { alert('Título y autor obligatorios'); return; }
  addBook(title, author, year || new Date().getFullYear(), copies || 1);
  save(loadBooks());
  // limpiar inputs
  document.getElementById('book-title').value = '';
  document.getElementById('book-author').value = '';
  document.getElementById('book-year').value = '';
  document.getElementById('book-copies').value = 1;
  render();
});

// Guardar manual
document.getElementById('save-btn').addEventListener('click', () => {
  save(loadBooks());
  alert('Biblioteca guardada en localStorage');
});
