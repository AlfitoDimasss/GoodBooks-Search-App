class BookList extends HTMLElement {
  constructor() {
    super();
  }

  set books(books) {
    this._books = books;
    this.renderList();
    this.renderItem(this._books);
  }

  renderList() {
    this.innerHTML = `
    <h1 class="vertical py-2 text-sm font-secondary xl:text-lg">Result Books</h1>
    <div class='w-full p-2 grid grid-cols-1 text-center gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' id='bookResult'></div>
    `
  }

  renderItem(books) {
    const bookResult = document.getElementById('bookResult');
    bookResult.innerHTML = '';
    books.forEach(book => {
      const bookItemElement = document.createElement('book-item');
      bookItemElement.book = book;
      bookResult.appendChild(bookItemElement);
    });
  }
}

customElements.define('book-list', BookList);