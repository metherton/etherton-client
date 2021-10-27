import { LitElement, html, css } from 'lit-element';
import { PageHome } from './PageHome.js';
import { PageLogin } from './PageLogin.js';
import { PageAbout } from './PageAbout.js';
import { Login } from './login.js';
import { logInfo } from './Logger.js';

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
    fetch('/config.json')
    .then(response => response.json())
    .then(data => {
      return window.APP_CONFIG = data
    })
    .then(() => {
      return this.getBranches();
    });
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
    const response = await fetch(APP_CONFIG.BASE_API_URL + '/api/branches', {
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


  navigatePage(ev) {
    this.page = ev.currentTarget.href.split("#")[1];
    this._renderPage();
  }


  render() {
    return html`
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3pro.css">
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3pro.css">
      <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-deep-orange.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <style>
        body, h1,h2,h3,h4,h5,h6
        .w3-row-padding img {margin-bottom: 12px}
        /* Set the width of the sidebar to 120px */
        .w3-sidebar {width: 120px;background: #222;}
        /* Add a left margin to the "page content" that matches the width of the sidebar (120px) */
        #main {margin-left: 120px}
        /* Remove margins from "page content" on small screens */
        @media only screen and (max-width: 600px) {#main {margin-left: 0}}
      </style>



      <main>
        ${this._renderPage()}
      </main>`;
  }

  _renderPage() {
    switch (this.page) {
      case 'home':
        return html`
          <page-home .branches='${this.branches}' .persons='${this.persons}'></page-home>
        `;
      case 'about':
        return html`
          <page-about></page-about>
        `;
      case 'ons':
        return html`
          <page-search></page-search>
        `;
      default:
        return html`
          <page-home .branches='${this.branches}' .persons='${this.persons}'></page-home>
        `;
    }
  }


}
