import { LitElement, html, css } from 'lit-element';
import { PageLogin } from './PageLogin.js';
import { Login } from './login.js';
import { EthertonList } from './EthertonList.js';
import { EthertonListItem } from './EthertonListItem.js';

export class PageHome extends LitElement {

  static get properties() {
    return {
      losers: {type: Array},
      xCsrfToken: {type: String}
    };
  }

  constructor() {
    super();
    this.losers = [];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  handleLosers() {
    this.getLosers().then(response => {
      if (response.status == 401) {
        this.dispatchEvent(new CustomEvent('login', {bubbles: true, detail: 'login'}));
        return;
      }
      return response.json();
    })
    .then(data => {
      this.losers = data;
    })
    .catch(err => {
      console.log(err);
    });
  }

  async getLosers() {
    let body = 'xCsrfToken=' + Login.xCsrfToken || "";
    //fetch('https://www.martinetherton.com:8443/secured')
   // const response = await fetch('https://localhost:8443/losers', {
    //const response = await fetch('https://www.martinetherton.com:8443/losers', {
    const response = await fetch('http://localhost:8080/losers', {
    //const response = await fetch('http://www.martinetherton.com:8080/losers', {

      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    });
    return response;
  }

  static get styles() {
    return css`
    `;
  }

  __onNavClicked(ev) {
    const page = ev.currentTarget.id.split('-')[1];
    this.dispatchEvent(new CustomEvent('navigate', {detail: page}));
  }

  login() {
    this.dispatchEvent(new CustomEvent('login', {bubbles: true, detail: 'login'}));
  }

  logout() {
    let body = 'xCsrfToken=' + Login.xCsrfToken || "";
    //fetch('http://localhost:8080/logout', {
    fetch('http://www.martinetherton.com:8080/logout', {
    //fetch('https://localhost:8443/logout', {
    //fetch('https://www.martinetherton.com:8443/logout', {
    //const response = await fetch('http://localhost:8080/losers', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body
    })
    .then(data => {
      console.log(data);
    });
    this.losers = undefined;
    this.dispatchEvent(new CustomEvent('logout', {bubbles: true, detail: 'home'}));
  }

  render() {
    return html`
        ${this.losers?
        html`
        <button @click="${this.logout}">Logout</button><button @click="${this.handleLosers}">Get Losers</button>
        <etherton-list>
          ${this.losers.map(loser => html`
          <etherton-list-item>${loser.companyName}</etherton-list-item>
          <etherton-list-item>${loser.changes}</etherton-list-item>
          <etherton-list-item>${loser.changesPercentage}</etherton-list-item>
          <etherton-list-item>${loser.price}</etherton-list-item>
          <etherton-list-item>${loser.ticker}</etherton-list-item>
          `)}
        </etherton-list>`:
         html`no companies&nbsp;<button @click="${this.handleLosers}">Get Losers</button>`}
    `;
  }

}

customElements.define('page-home', PageHome);
