// Showing and closing submit form
const modal = document.querySelector('.overlay');
const openModalDiv = document.querySelector('.add-book-btn');
const closeBtn = document.querySelector('.close-btn');
const bookContainer = document.querySelector('.book-container');
const deleteBtn = document.querySelector('#delete-book')
const readBtn = document.querySelectorAll('#read-btn');
const submitBook = document.querySelector('#submit-new-book');
const newTitle = document.getElementById("title");
const newAuthor = document.getElementById("author");
const newPages = document.getElementById("pages");
const readStatus = document.getElementById("read");
const form = document.querySelector('form')

function openModal(param) {
    param.style.display = 'block';
}

function closeModal(param) {
    param.style.display = 'none';
    form.reset();
}

function deleteBook(bookElement) {
    const titleElement = bookElement.querySelector('h2 span');
    const title = titleElement.textContent;

    const index = libraryOfBook.library.findIndex(book => book.title === title);

    if (index !== -1) {
        libraryOfBook.library.splice(index, 1);
    }

    bookElement.remove();
}

function toggleReadStatus(bookElement) {
    const titleElement = bookElement.querySelector('h2 span');
    const title = titleElement.textContent;

    const book = libraryOfBook.library.find(book => book.title === title);

    if (book) {
        book.readToggle();

        const readBtn = bookElement.querySelector('#read-btn');
        readBtn.textContent = book.read ? 'Unread' : 'Read';
    }
}


class Book {
    constructor(title, author, pages, read, edited) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = Boolean(read);
        this.edited = Boolean(edited);
    }
    readToggle() {
        this.read = !this.read;
    }
}


class Library {
    library
    constructor(library = []) {
        this.library = library;
    }
    addBookToLibrary(book) {
        this.library.push(book);
    }
    getLibrary() {
        return libraryOfBook.library
    }
}



function renderBook() {
    const displayBook = () => {

        let title = newTitle.value;
        let author = newAuthor.value;
        let pages = parseInt(newPages.value);
        let read = readStatus.checked;

        const newBook = new Book(title, author, pages, read);
        libraryOfBook.addBookToLibrary(newBook);

        const html = `
    <div class="card">
        <h2>Title: <span>${newBook.title}</span></h2>
        <h3>Author: <span>${newBook.author}</span></h3>
        <h4>Pages: <span>${newBook.pages}</span></h4>
        <br />
        <button class="add-book-btn" id="read-btn">${newBook.read ? 'Read' : 'Unread'}</button>
        <button class="delete-book-btn" id="delete-book">Delete Book</button>
        <button class="add-book-btn" id="edit-book">Edit</button>
    </div>
    `;
        const bookElement = document.createElement('div');
        bookElement.innerHTML = html;
        bookContainer.appendChild(bookElement);
    }

    return { displayBook }
}

function editBook() {
    const edit = () => {

    }
}

let render = renderBook();

openModalDiv.addEventListener('click', () => {
    openModal(modal);
});

closeBtn.addEventListener('click', () => {
    closeModal(modal);
});

submitBook.addEventListener('click', () => {
    render.displayBook();
    closeModal(modal);
});

bookContainer.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('delete-book-btn')) {
        const bookElement = target.closest('.card');
        deleteBook(bookElement);
    }
});

bookContainer.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('add-book-btn') && target.id === 'read-btn') {
        const bookElement = target.closest('.card');
        toggleReadStatus(bookElement);
    }
});

const libraryOfBook = new Library();