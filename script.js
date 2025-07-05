// Array to store all book objects
const myLibrary = [];

// Book constructor function
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID(); // Generate a unique ID for each book
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Prototype method to toggle read status
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// Function to create a new Book object and add it to the library array
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks(); // Re-render the book list
}

// Function to render all books in the DOM
function displayBooks() {
  const container = document.getElementById("books-container");
  container.innerHTML = ""; // Clear previous content

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id; // For tracking specific books

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.read ? "Read" : "Unread"}</p>
      <button class="toggle-read">Toggle Read</button>
      <button class="remove-book">Remove</button>
    `;

    // Event listener to toggle read status
    card.querySelector(".toggle-read").addEventListener("click", () => {
      book.toggleRead();
      displayBooks();
    });

    // Event listener to remove the book from the library
    card.querySelector(".remove-book").addEventListener("click", () => {
      const index = myLibrary.findIndex((b) => b.id === book.id);
      if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
      }
    });

    container.appendChild(card);
  });
}

// Modal and form-related variables
const dialog = document.getElementById("book-dialog");
const newBookBtn = document.getElementById("new-book-btn");
const cancelBtn = document.getElementById("cancel-btn");
const form = document.getElementById("book-form");

// Show the book form modal
newBookBtn.addEventListener("click", () => dialog.showModal());

// Close the modal when cancel is clicked
cancelBtn.addEventListener("click", () => dialog.close());

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = parseInt(document.getElementById("pages").value);
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);

  form.reset(); // Clear the form
  dialog.close(); // Close the modal
});



const dummyBooks = [
  { title: "To Kill a Mockingbird", author: "Harper Lee", pages: 281, read: true },
  { title: "1984", author: "George Orwell", pages: 328, read: false },
  { title: "Pride and Prejudice", author: "Jane Austen", pages: 279, read: true },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", pages: 180, read: false },
  { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 310, read: true },
  { title: "Moby Dick", author: "Herman Melville", pages: 585, read: false },
  { title: "War and Peace", author: "Leo Tolstoy", pages: 1225, read: false },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", pages: 214, read: true },
  { title: "The Lord of the Rings", author: "J.R.R. Tolkien", pages: 1137, read: true },
  { title: "The Alchemist", author: "Paulo Coelho", pages: 208, read: true },
  { title: "Fahrenheit 451", author: "Ray Bradbury", pages: 194, read: false },
  { title: "Brave New World", author: "Aldous Huxley", pages: 268, read: false },
  { title: "The Book Thief", author: "Markus Zusak", pages: 552, read: true },
  { title: "The Road", author: "Cormac McCarthy", pages: 287, read: true },
  { title: "Life of Pi", author: "Yann Martel", pages: 354, read: false },
  { title: "Sapiens", author: "Yuval Noah Harari", pages: 443, read: true },
  { title: "The Kite Runner", author: "Khaled Hosseini", pages: 371, read: false },
  { title: "The Fault in Our Stars", author: "John Green", pages: 313, read: true },
  { title: "Crime and Punishment", author: "Fyodor Dostoevsky", pages: 671, read: false },
  { title: "The Shining", author: "Stephen King", pages: 447, read: true },
];


dummyBooks.forEach(book =>
  addBookToLibrary(book.title, book.author, book.pages, book.read)
);
