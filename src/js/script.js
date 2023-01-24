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

class BooksList {
    constructor() {
        const thisList = this;

        thisList.favoriteBooks = [];
        thisList.filters = [];

        thisList.initData();
        thisList.getElements();
        thisList.initActions();
        thisList.filterBooks();
        thisList.determineRatingBgc();
    }

    initData() {
        this.data = dataSource.books;
    }


    getElements() {
        const thisList = this;

        thisList.books = document.querySelector(select.templateOf.bookList);
        thisList.form = document.querySelector(select.form);
        thisList.bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
    }

   function render() {
    for (const book of this.data) {
        //generate a new constat for a rating stripe
        book.ratingBgc = determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;

        // generate HTML based on the template and on a given book's data
        const generatedHTML = templates.menuBooks(book);
        // generate DOM element
        const bookHTML = utils.createDOMFromHTML(generatedHTML);
        //console.log('html', bookHTML)
        // generated DOM element join as a new DOM child to the list .books-list
        const books = document.querySelector(select.templateOf.bookList);
        //console.log(listOfBooks);
        books.appendChild(bookHTML);
    }
}

initActions() {
    const thisList = this;
    //const books = document.querySelector(select.templateOf.bookList);
    //event listener
    thisList.books.addEventListener('dblclick', function (event) {
        event.preventDefault();
        //check whether event.target.offsetParent owns class .book__image
        const book = event.target.offsetParent;
        console.log('book', book);
        if (book.classList.contains('book__image')) {
            //get book's id from data-id
            const bookId = book.getAttribute('data-id');
            // add id to favoriteBooks
            if (!thisList.favoriteBooks.includes(bookId)) {
                book.classList.add(select.class.favorite);
                thisList.favoriteBooks.push(bookId);
            } else {
                book.classList.remove(select.class.favorite);
                const index = thisList.favoriteBooks.indexOf(bookId);
                thisList.favoriteBooks.splice(index, 1);
            }
        }
    });

    //const form = document.querySelector(select.form);

    thisList.form.addEventListener('click', function (event) {
        console.log('single click', event);
        if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
            console.log(event.target);
            if (event.target.checked) {
                thisList.filters.push(event.target.value);
                console.log('Adding filters', thisList.filters);
            } else {
                thisList.filters.splice(thisList.filters.indexOf(event.target.value), 1);
                console.log('Left in filters', thisList.filters);
            }
            thisList.filterBooks();
        }
    });
}

filterBooks() {

    for (const book of this.data) {
        let shouldBeHidden = false;

        for (const filter of thisList.filters) {
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

determineRatingBgc(rating) {

    let ratingBgc = '';

    if (rating < 6) {
        ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
        ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
        ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
        ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }

    return ratingBgc;
}


render();

initActions();

};

const app = new BooksList();

