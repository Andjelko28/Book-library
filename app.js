// Showing and closing submit form
const modal = document.querySelector('.overlay');
const openModalDiv = document.querySelector('.add-book-btn');
const closeBtn = document.querySelector('.close-btn');
const bookContainer = document.querySelector('.book-container');
const deleteBtn = document.querySelector('#delete-book')
const readBtn = document.querySelector('#read-btn');

function openModal(param) {
    param.style.display = 'block';
}

function closeModal(param) {
    param.style.display = 'none';
}

class Book {
    constructor(title, author, pages, read, edited) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = Boolean(read);
        this.edited = Boolean(edited);
    }
}



class Library {
    constructor(library = []) {
        this.library = library;
    }
    addBookToLibrary(book) {
        this.library.push(book);
    }
}

function displayBooks() {
    const submitBtn = document.querySelector('#submit-new-book').addEventListener('click', () => {

        const newTitle = document.getElementById("title").value;
        const newAuthor = document.getElementById("author").value;
        const newPages = parseInt(document.getElementById("pages").value);
        const readStatus = document.getElementById("read").checked;

        const newBook = new Book(newTitle, newAuthor, newPages, readStatus);

        libraryOfBook.addBookToLibrary(newBook);

        const html = `
        <div class="card">
            <h2>Title: <span>${newBook.title}</span></h2>
            <h3>Author: <span>${newBook.author}</span></h3>
            <h4>Pages: <span>${newBook.pages}</span></h4>
            <br />
            <button class="add-book-btn" id="read-btn">${newBook.read ? 'Read' : 'Unread'}</button>
            <button class="add-book-btn" id="delete-book">Delete Book</button>
            <button class="add-book-btn" id="edit-book">Edit</button>
        </div>
        `;

        // Dodavanje novog HTML sadržaja u .book-container
        const bookElement = document.createElement('div');
        bookElement.innerHTML = html;
        bookContainer.appendChild(bookElement);

        closeModal();
    });
}

displayBooks();


openModalDiv.addEventListener('click', () => openModal(modal));
closeBtn.addEventListener('click', () => closeModal(modal));



const libraryOfBook = new Library();