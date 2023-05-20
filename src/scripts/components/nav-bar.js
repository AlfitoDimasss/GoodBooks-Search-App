class NavBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <nav class="bg-[#F9F3EE] py-5 px-5 xl:px-40 flex justify-between items-center">
      <h1 class="font-secondary text-2xl">GoodBooks</h1>
      <div class="flex gap-5">
        <a href='#' class="font-secondary">Books</a>
        <a href='#' class="font-secondary">About</a>
      </div>
    </nav>
    `;
  }
}

customElements.define('nav-bar', NavBar);