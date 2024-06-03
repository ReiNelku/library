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

function deleteBookFromLibrary(bookIndex) {
  delete myLibrary[bookIndex];

  const bookCard = document.querySelector(`div[data-index="${bookIndex}"`);
  main.removeChild(bookCard);

  displayBooks();
}

const book1 = new Book("Author 1", "The Title 1", "69", true);

addBookToLibrary(book1);

const book2 = new Book("Author 2", "The Title 2", "420", false);

addBookToLibrary(book2);

const book3 = new Book("Author 3", "The Title 3", "69420", true);

addBookToLibrary(book3);

const main = document.querySelector("main");

function displayBooks() {
  if (myLibrary.length === 0 || myLibrary.every((book) => book === undefined)) {
    const noBooks = document.createElement("h3");
    noBooks.textContent = "No Books Added Yet!";
    noBooks.classList.add("no-books");

    main.style.gridTemplateColumns = "1fr";
    main.appendChild(noBooks);
    return;
  } else {
    main.style.gridTemplateColumns = "";
    if (document.querySelector(".no-books")) {
      document.querySelector(".no-books").remove();
    }
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

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const read = document.createElement("button");
    read.classList.add("read-status");
    function setReadStatus() {
      if (book.isRead) {
        read.textContent = "Read";
        read.classList.add("read");
        read.classList.remove("not-read");
      } else {
        read.textContent = "Not Read";
        read.classList.add("not-read");
        read.classList.remove("read");
      }
    }
    setReadStatus();
    read.addEventListener("click", () => {
      myLibrary[index].isRead = !myLibrary[index].isRead;
      setReadStatus();
    });
    buttons.appendChild(read);

    const deleteBookBtn = document.createElement("button");
    deleteBookBtn.textContent = "Delete!";
    deleteBookBtn.classList.add("delete-book");
    deleteBookBtn.addEventListener("click", () => {
      if (confirm("Are you sure? This action cannot be undone!")) {
        deleteBookFromLibrary(index);
      }
    });
    buttons.appendChild(deleteBookBtn);

    card.appendChild(buttons);

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
