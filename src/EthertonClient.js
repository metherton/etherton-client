import { LitElement, html, css } from 'lit-element';
import { PageHome } from './PageHome.js';
import { PageLogin } from './PageLogin.js';
import { Login } from './login.js';
import { logInfo } from './logInfo.js';

export class EthertonClient extends LitElement {

  static get properties() {
    return {
      page: {type: String},
      previousPage: {type: String},
      xCsrfToken: {type: String},
      persons: {type: Array}
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
//    fetch('/config.json')
//    .then(response => response.json())
//    .then(data => {
//      return window.APP_CONFIG = data
//    })
//    .then(() => {
//      return this.getBranches();
//    })
//    .then(response => {
//      return response.json();
//    })
//    .then(data => {
//      this.branches = data;
//    })
//    .catch(err => {
//      console.log(err);
//    });
  }

  async getBranches() {
    const response = await fetch(APP_CONFIG.BASE_API_SECURE_URL + '/api/branches', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    });
    return response;
  }

  async getHello() {
    const res = await fetch(APP_CONFIG.BASE_API_SECURE_URL + '/api/hello', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    });
    return res;
  }

  async getPersons() {
    const response = await fetch(APP_CONFIG.BASE_API_SECURE_URL + '/api/persons', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    });
    return response;
  }

  callme() {
    logInfo();
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
      <main>
        <h1>Etherton One Name Study</h1>
        ${this._renderPage()}
      </main>`;
  }

  _renderPage() {
    switch (this.page) {
      case 'home':
        return html`
          <page-home .branches='${this.branches}' .persons='${this.persons}'></page-home>
        `;
      default:
        return html`
          <p>Page not found try going to <a href="#home">Home</a></p>
        `;
    }
  }


}
