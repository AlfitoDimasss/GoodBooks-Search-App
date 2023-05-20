class FooterComp extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <footer class=" w-full mt-2 text-center p-5">
      <span class="font-secondary bg-[#daaa63] p-2 rounded-lg text-white">Made by Alfito Dimas Prasetyo</span>
    </footer>
    `;
  }
}

customElements.define('footer-comp', FooterComp);