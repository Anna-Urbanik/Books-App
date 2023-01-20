'use strict';

const select = {
  templateOf: {
    bookTemplate: '#template-book',
    bookList: '.books-list',
    bookImage: '.book__image',
  },
  class: {
    favorite: 'favorite',
  },
};

const templates = {
  menuBooks: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
};

const favoriteBooks = [];

function render() {
  for (const book of dataSource.books) {
    // generate HTML based on the template and on a given book's data
    const generatedHTML = templates.menuBooks(book);
    // generate DOM element
    const bookHTML = utils.createDOMFromHTML(generatedHTML);
    //console.log('html', bookHTML)
    // generated DOM element join as a new DOM child to the list .books-list
    const listOfBooks = document.querySelector(select.templateOf.bookList);
    //console.log(listOfBooks);
    listOfBooks.appendChild(bookHTML);
  }
}

function initActions() {
  const books = document.querySelectorAll(select.templateOf.bookImage);

  for (let book of books) {
    //event listener
    book.addEventListener('dblclick', function (event) {
      //preventDefault
      event.preventDefault();
      //add class 'favorite'
      book.classList.add(select.class.favorite);
      //book's id from data-id
      const bookId = book.getAttribute('data-id');
      console.log(book);
      // add id to favoriteBooks
      if (!favoriteBooks.includes(bookId)) {
        book.classList.add(select.class.favorite);
        favoriteBooks.push(bookId);
      } else {
        book.classList.remove(select.class.favorite);
        const index = favoriteBooks.indexOf(bookId);
        favoriteBooks.splice(index, 1);
      }
    });
  }
}


render();

initActions();