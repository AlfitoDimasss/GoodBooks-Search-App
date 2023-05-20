class ShelfBorder extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="trapezoid"></div>
    <div class="bg-[#F4F1EB] w-full h-4" style="box-shadow: 8px 8px 8px #888888;"></div>
    `;
  }
}

customElements.define('shelf-border', ShelfBorder);