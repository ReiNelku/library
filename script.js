const myLibrary = [];

function Book(author, title, pages, isRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const main = document.querySelector("main");

function displayBooks() {
  if (myLibrary.length === 0) {
    const noBooks = document.createElement("h3");
    noBooks.textContent = "No Books Added Yet!";
    noBooks.classList.add("no-books");

    main.appendChild(noBooks);
    return;
  }
}

displayBooks();
