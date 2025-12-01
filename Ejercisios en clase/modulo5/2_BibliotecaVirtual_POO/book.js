// book.js - definición de la clase Book (POO)
// Implementa encapsulación con campo privado (#available) y métodos para pedir/devolver

import { Author } from './author.js';

export class Book {
  #available;
  constructor(id, title, authorName, year, copies = 1) {
    this.id = id;
    this.title = title;
    // Guardamos autor como instancia de Author para mostrar composición
    this.author = new Author(authorName);
    this.year = year;
    this.copies = copies;
    this.#available = copies;
  }

  borrow() {
    if (this.#available === 0) throw new Error('No hay copias disponibles');
    this.#available--;
  }

  returnCopy() {
    if (this.#available < this.copies) this.#available++;
  }

  availableCopies() {
    return this.#available;
  }

  // Método estático para comparar por año
  static compareByYear(a, b) {
    return a.year - b.year;
  }
}
