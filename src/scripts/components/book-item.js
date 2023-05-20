class BookItem extends HTMLElement {
  constructor() {
    super();
  }

  set book(book) {
    this._book = book;
    this.render();
  }

  renderStarRating(rating) {
    let star = '';
    if (rating) {
      for (let i = 0; i < rating; i++) {
        star += `<svg aria-hidden="true" class="w-5 h-5 text-[#daaa63]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;
      }
      if (rating < 5) {
        for (let i = 0; i < 5 - rating; i++) {
          star += `<svg aria-hidden="true" class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;
        }
      }
    } else {
      for (let i = 0; i < 5; i++) {
        star += `<svg aria-hidden="true" class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;
      }
    }
    return star;
  }

  render() {
    this.innerHTML = `
    <div class='flex h-44 gap-3 xl:h-60'>
        <div class='w-1/2 rounded-lg'>
          <img src="${this.checkImage(this._book.volumeInfo.imageLinks)}" alt="Cover not Found" class="w-full h-full book-shadow rounded-lg">
        </div>
        <div class='w-1/2 text-left p-2 flex flex-col justify-between'>
          <div>
            <div class="flex">
              ${this.renderStarRating(this._book.volumeInfo.averageRating)}
            </div>
            <h1 class='text-xs xl:text-sm mt-2 font-semibold'>${this.checkTitle(this._book.volumeInfo.title)}</h1>
            <h1 class='text-[9px] font-secondary xl:text-xs mt-1 text-slate-500'>${this.checkAuthor(this._book.volumeInfo.authors)}</h1>
          </div>
          <button type="button" id='${this.checkISBN(this._book.volumeInfo.industryIdentifiers)}' class="font-secondary text-[#daaa63] bg-transparent hover:bg-yellow-500 hover:text-white font-medium rounded-full text-sm px-8 py-2 text-center mt-5 border border-[#daaa63] btn-detail">Detail</button>
        </div>
      </div>
    `;
  }

  checkImage(img) {
    if (typeof img !== 'undefined') {
      return img.thumbnail;
    } else {
      return null;
    }
  }

  checkAuthor(author) {
    if (typeof author !== 'undefined') {
      return author[0];
    }
    return 'Unknown';
  }

  checkTitle(title) {
    if (title.length < 31) {
      return title;
    } else {
      return title.substring(0, 31) + '...';
    }
  }

  checkISBN(isbn) {
    if (isbn) {
      return isbn[0].identifier;
    }
    return -1;
  }

}

customElements.define('book-item', BookItem);