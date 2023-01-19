'use strict';

const select = {
    templateOf: {
        bookTemplate: '#template-book',
        bookList: '.books-list',
        bookImage: '.book__image',
    },
};

const templates = {
    menuBooks: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
};

function render() {
    for (const book of dataSource.books) {
        // generate HTML based on the template and on a given book's data
        const generatedHTML = templates.menuBooks(book); 
        // generate DOM element
        const bookHTML= utils.createDOMFromHTML(generatedHTML);
        // generated DOM element join as a new DOM child to the list .books-list
        const listOfBooks= document.querySelector(select.templateOf.bookList);
        listOfBooks.appendChild(bookHTML);
    }
}

render();