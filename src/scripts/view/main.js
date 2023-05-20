import $ from 'jquery';
import axios from 'axios';
import '../components/book-list';
import '../components/book-item';
import '../components/nav-bar';
import '../components/shelf-border';
import '../components/footer-comp';
import '../components/display-book';

const main = () => {

  const BASE_URL = 'https://www.googleapis.com/books/v1/volumes?';
  const API_KEY = 'AIzaSyCOhu0S-5G2S5wsCCEUle-nKY8aQ1EBPI8';

  const formSearch = $('#form-search');
  formSearch.on('submit', async function (e) {
    e.preventDefault();
    const inputSearch = $('#default-search');
    const results = await searchBooks(inputSearch.val());
    inputSearch.val('');
    const bookList = document.querySelector('book-list');
    bookList.books = results;
    renderButton();
  });

  const searchBooks = async (val) => {
    try {
      const response = await axios.get(`${BASE_URL}q=${val}&maxResults=12&orderBy=relevance&key=${API_KEY}`);
      const booksResult = response.data.items;
      return booksResult;
    } catch (error) {
      console.log(error);
    }
  }

  const getRandomChar = () => {
    return Math.random().toString(36).substring(2, 3);
  }

  const getLatestBook = async () => {
    try {
      const query = getRandomChar();
      const response = await axios.get(`${BASE_URL}q=${query}&maxResults=1&orderBy=newest&key=${API_KEY}`);
      const bookResult = response.data.items[0].volumeInfo;
      const latestBook = document.getElementById('latestBook');
      latestBook.name = 'Latest Book';
      latestBook.book = bookResult;
    } catch (error) {
      console.log(error);
    }
  }

  const getRandomBook = async () => {
    try {
      const query = getRandomChar();
      const response = await axios.get(`${BASE_URL}q=${query}&maxResults=1&key=${API_KEY}`);
      const bookResult = response.data.items[0].volumeInfo;
      const randomBook = document.getElementById('randomBook');
      randomBook.name = 'Random Book';
      randomBook.book = bookResult;
    } catch (error) {
      console.log(error);
    }
  }

  const renderButton = () => {
    const buttons = document.querySelectorAll('.btn-detail');
    buttons.forEach(button => {
      button.addEventListener('click', event => {
        const bookId = event.target.id;
        showModal(bookId);
      });
    });
  }

  const showModal = async id => {
    const modal = $('#myModal');
    const span = $('.close');
    const body = $('.modal-body');

    modal.css('display', 'block');
    body.html('');

    if (id == -1) {
      body.html(`<h1>Sorry, No Detail For Now</h1>`);
    } else {
      try {
        const response = await axios.get(`${BASE_URL}q=isbn:${id}&key=${API_KEY}`);
        let bookResult = response.data.items;
        if (!bookResult) {
          body.html(`<h1>Sorry, No Detail For Now</h1>`);
        } else {
          bookResult = response.data.items[0].volumeInfo;
          renderModalBody(bookResult);
        }
      } catch (error) {
        console.log(error);
      }
    }

    span.on('click', function () {
      modal.css('display', 'none');
    })
  }

  const renderModalBody = book => {
    const body = document.querySelector('.modal-body');
    body.innerHTML = '';
    body.innerHTML = `
      <ul class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
        <li class="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg"><b>Title</b>: ${book.title}</li>
        <li class="w-full px-4 py-2 border-b border-gray-200"><b>Author</b>: ${book.authors[0]}</li>
        <li class="w-full px-4 py-2 border-b border-gray-200"><b>Published Date</b>: ${book.publishedDate}</li>
        <li class="w-full px-4 py-2 border-b border-gray-200"><b>Description</b>:<br>${book.description}</li>
      </ul>
    `;
  }

  getLatestBook();
  getRandomBook();
}

export default main;