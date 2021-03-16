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

//    this.getLosers().then(response => {
////      if (response.status == 401) {
////        this.dispatchEvent(new CustomEvent('login', {bubbles: true, detail: 'login'}));
////      }
//      return response.json();
//    })
//    .then(data => {
//      this.losers = data;
//    })
//    .catch(err => {
//      console.log(err);
//    });
  }



  async getLosers() {
    let body = 'xCsrfToken=' + this.xCsrfToken;
    //fetch('https://www.martinetherton.com:8443/secured')
    const response = await fetch('https://localhost:8443/losers', {
    //const response = await fetch('https://www.martinetherton.com:8443/losers', {
    //const response = await fetch('http://localhost:8080/losers', {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-csrf-token': Login.xCsrfToken
      },
      body: body
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

  handleLosers() {
    this.getLosers().then(response => {
      return response.json();
    })
    .then(data => {
      this.losers = data;
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return html`
        ${this.losers?
        html`



        <etherton-list>
          ${this.losers.map(loser => html`<etherton-list-item>${loser.companyName}</etherton-list-item>`)}
        </etherton-list>`:
         html`no companies`}
    `;
  }

}

customElements.define('page-home', PageHome);
