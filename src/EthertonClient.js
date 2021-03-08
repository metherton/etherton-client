import { LitElement, html, css } from 'lit-element';
import { openWcLogo } from './open-wc-logo.js';

import { PageHome } from './PageHome.js';
import { PageLogin } from './PageLogin.js';

export class EthertonClient extends LitElement {



  static get properties() {
    return {
      title: { type: String },
      page: {type: String},
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
        background-color: var(--etherton-client-background-color);
      }

      main {
        flex-grow: 1;
      }

      .logo > svg {
        margin-top: 36px;
        animation: app-logo-spin infinite 20s linear;
      }

      @keyframes app-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
      }
    `;
  }

  constructor() {
    super();
    this.title = 'My app';
    this.page = 'home';
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <main @login='${this.login}'>
        ${this._renderPage()}
      </main>`;
  }

  _renderPage() {
    switch (this.page) {
      case 'home':
        return html`
          <page-home></page-home>
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

  login(ev) {
//    ev.preventDefault();
    this.page = ev.detail;
  }

  __navClass(page) {
    return classMap({ active: this.page === page });
  }



}
