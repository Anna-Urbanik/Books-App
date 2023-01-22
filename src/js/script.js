'use strict';

const select = {
    templateOf: {
        bookTemplate: '#template-book',
        bookList: '.books-list',
        bookImage: '.book__image',
        bookPanel: '.books-panel',
    },
    class: {
        favorite: 'favorite',
        hidden: 'hidden',
    },
    form: '.filters',
};

const templates = {
    menuBooks: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
};

const favoriteBooks = [];

const filters = [];

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
    //const books = document.querySelectorAll(select.templateOf.bookImage);
    const books = document.querySelector(select.templateOf.bookList);
    //event listener
    books.addEventListener('dblclick', function (event) {
        //preventDefault
        event.preventDefault();
        //check whether event.target.offsetParent owns class .book__image
        const book = event.target.offsetParent;
        console.log('book', book);
        if (book.classList.contains('book__image')) {
            //get book's id from data-id
            const bookId = event.target.offsetParent.getAttribute('data-id');
            // add id to favoriteBooks
            if (!favoriteBooks.includes(bookId)) {
                book.classList.add(select.class.favorite);
                favoriteBooks.push(bookId);
            } else {
                book.classList.remove(select.class.favorite);
                const index = favoriteBooks.indexOf(bookId);
                favoriteBooks.splice(index, 1);
            }
        }
    })

    const form = document.querySelector(select.form);

    form.addEventListener('click', function (event) {
        console.log('single click', event);
        if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
            console.log(event.target);
            if (event.target.checked) {
                filters.push(event.target.value);
                console.log('Adding filters', filters);
            } else {
                filters.splice(filters.indexOf(event.target.value), 1);
                console.log('Left in filters', filters);

                filterBooks();
            }
        }
    });


}

function filterBooks() {

    for (const book of dataSource.books) {
        let shouldBeHidden = false;

        for (const filter of filters) {
            if (!book.details[filter]) {
                shouldBeHidden = true;
                break;
            }
        }
        if (shouldBeHidden == true) {
            const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
            bookImage.classList.add(select.class.hidden);
            console.log('hidden upon click', bookImage);
        } else if (shouldBeHidden == false) {
            const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
            bookImage.classList.remove(select.class.hidden);
        }
    }
}


render();

initActions();
