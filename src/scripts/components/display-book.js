class DisplayBook extends HTMLElement {
  constructor() {
    super();
  }

  set book(book) {
    this._book = book;
    this.render();
  }

  set name(name) {
    this._name = name;
  }

  render() {
    this.innerHTML = `
    <h1 class="vertical py-2 font-secondary text-sm xl:text-lg">${this._name}</h1>
    <div class="w-full h-full rounded-lg bg-white overflow-hidden book-shadow">
      <img src="${this.checkImage(this._book.imageLinks)}" alt="" class="w-full h-3/4">
      <div class="p-3 h-full">
        <h5 class="text-[9px] xl:text-sm">${this.checkTitle(this._book.title)}</h5>
        <p class="text-[9px] font-secondary text-slate-500 mt-1 xl:text-xs">${this.checkAuthor(this._book.authors)}</p>
      </div>
    </div>
    `
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
    if (title.length < 15) {
      return title;
    } else {
      return title.substring(0, 15) + '...';
    }
  }

}

customElements.define('display-book', DisplayBook);