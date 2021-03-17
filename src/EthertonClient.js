import { LitElement, html, css } from 'lit-element';
import { PageHome } from './PageHome.js';
import { PageLogin } from './PageLogin.js';
import { Login } from './login.js';

export class EthertonClient extends LitElement {

  static get properties() {
    return {
      page: {type: String},
      previousPage: {type: String},
      xCsrfToken: {type: String}
    };
  }

  static get styles() {
    return css`
    `;
  }

  constructor() {
    super();
    this.page = 'home';
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <main @logout='${this.logout}' @login='${this.login}' @loggedIn='${this.navigateToPage}'>
        ${this._renderPage()}
      </main>`;
  }

  _renderPage() {
    switch (this.page) {
      case 'home':
        return html`
          <page-home .xCsrfToken='${this.xCsrfToken}'></page-home>
        `;
      case 'login':
        return html`
          <page-login></page-login>
        `;
      default:
        return html`
          <p>Page not found try going to <a href="#home">Home</a></p>
        `;
    }
  }

    logout(ev) {
      this.page = ev.detail;
    }

  navigateToPage(ev) {
    this.page = ev.detail;
  }

  login(ev) {
    this.page = ev.detail;
    this.previousPage = ev.srcElement.localName.split("-")[1]
  }


}
