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

const book1 = new Book("Author 1", "The Title 1", "69", true);

addBookToLibrary(book1);

const book2 = new Book("Author 2", "The Title 2", "420", false);

addBookToLibrary(book2);

const book3 = new Book("Author 3", "The Title 3", "69420", true);

addBookToLibrary(book3);

const main = document.querySelector("main");

function displayBooks() {
  if (myLibrary.length === 0) {
    const noBooks = document.createElement("h3");
    noBooks.textContent = "No Books Added Yet!";
    noBooks.classList.add("no-books");

    main.style.gridTemplateColumns = "1fr";
    main.appendChild(noBooks);
    return;
  }

  myLibrary.forEach((book, index) => {
    if (document.querySelector(`div[data-index="${index}"`)) {
      return;
    }

    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;

    const title = document.createElement("h2");
    title.textContent = `Title: ${book.title}`;
    card.appendChild(title);

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;
    card.appendChild(author);

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;
    card.appendChild(pages);

    const read = document.createElement("button");
    read.classList.add("read-status");
    if (book.isRead) {
      read.textContent = "Read";
      read.classList.add("read");
    } else {
      read.textContent = "Not Read";
      read.classList.add("not-read");
    }
    card.appendChild(read);

    main.appendChild(card);
  });
}

const dialog = document.querySelector("dialog");
const newBookBtn = document.querySelector(".new-book");

newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

const cancelBtn = document.querySelector("button[value='cancel']");

cancelBtn.addEventListener("click", () => {
  dialog.close();
});

const submitBtn = document.querySelector("button[value='submit']");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const isRead = document.querySelector("#read");

  if (document.querySelector("form").reportValidity()) {
    const book = new Book(
      title.value,
      author.value,
      pages.value,
      isRead.checked
    );

    addBookToLibrary(book);

    dialog.close();

    displayBooks();
  }
});

displayBooks();
