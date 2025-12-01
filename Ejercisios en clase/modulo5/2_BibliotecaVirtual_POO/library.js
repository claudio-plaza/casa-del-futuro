// library.js - gestión de colección de libros
import { Book } from './book.js';

// Biblioteca mantiene array de libros y exporta funciones para manipularla
let books = [];

export const initLibrary = (initial) => {
  books = Array.isArray(initial) ? initial.map(b => {
    // Si vienen como objetos planos (desde localStorage), reconstruimos instancias
    return new Book(b.id, b.title, b.author.name || b.author, b.year, b.copies);
  }) : [];
};

export const loadBooks = () => books.slice();

export const addBook = (title, author, year, copies) => {
  const id = Date.now();
  const book = new Book(id, title, author, Number(year), Number(copies || 1));
  books.push(book);
  return book;
};

export const removeBook = (id) => {
  books = books.filter(b => b.id !== id);
};

export const borrowBook = (id) => {
  const b = books.find(x => x.id === id);
  if (b) b.borrow();
};

export const returnBook = (id) => {
  const b = books.find(x => x.id === id);
  if (b) b.returnCopy();
};

export const sortByYear = () => {
  books.sort(Book.compareByYear);
};
