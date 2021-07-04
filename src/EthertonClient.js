import { LitElement, html, css } from 'lit-element';
import { PageHome } from './PageHome.js';
import { PageLogin } from './PageLogin.js';
import { Login } from './login.js';

export class EthertonClient extends LitElement {

  static get properties() {
    return {
      page: {type: String},
      previousPage: {type: String},
      xCsrfToken: {type: String},
      profiles: {type: Array}
    };
  }

  static get styles() {
    return css`
    `;
  }

  constructor() {
    super();
    this.page = 'home';
    this.persons = [];
  }

  connectedCallback() {
    super.connectedCallback();
    fetch('/config.json')
    .then(response => response.json())
    .then(data => {
      window.APP_CONFIG = data
    })
    .then(() => {
      return this.getPersons();
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.persons = data;
    })
    .catch(err => {
      console.log(err);
    });
  }

  async getPersons() {
    const response = await fetch(APP_CONFIG.BASE_API_URL + '/persons', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    });
    return response;
  }

  render() {
    return html`
      <main>
        ${this._renderPage()}
      </main>`;
  }

  _renderPage() {
    switch (this.page) {
      case 'home':
        return html`
          <page-home .persons='${this.persons}'></page-home>
        `;
      default:
        return html`
          <p>Page not found try going to <a href="#home">Home</a></p>
        `;
    }
  }


}
