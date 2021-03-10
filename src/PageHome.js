import { LitElement, html, css } from 'lit-element';
import { PageLogin } from './PageLogin.js';
import { Login } from './login.js';

export class PageHome extends LitElement {

  static get properties() {
    return {
      losers: {type: Array},
    };
  }

  constructor() {
    super();
    this.losers = [];
 //   this.addEventListener('login', this.login);
  }

  connectedCallback() {
    super.connectedCallback();

    // fetch('https://www.martinetherton.com:8443/secured')
 // the response is a stream, we need to parse it as json first

  }

  getLosers() {
    const response = fetch('http://localhost:8080/losers', {
                            cache: 'no-cache',
                           headers: {
                           'Content-Type': 'application/json',
                             'Authorization': 'Basic ' + Login.token
                           }
                         });
    return response;
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
        margin: 0 auto;
        text-align: center;
      }
      .container {
        position: relative;
        max-width: 100%; /* Maximum width */
        margin: 0 auto; /* Center it */
      }
      .container .content {
        position: absolute; /* Position the background text */
        bottom: 50%; /* At the bottom. Use top:0 to append it to the top */
        background: rgb(0, 0, 0); /* Fallback color */
        background: rgba(0, 0, 0, 0.5); /* Black background with 0.5 opacity */
        color: #f1f1f1; /* Grey text */
        width: 100%; /* Full width */
      }

      mwc-list {
        width: 100%;
        font-weight: bold;
      }
      mwc-list-item {
        font-weight: bold;
      }

    `;
  }

  handleClick(ev) {

    return this.getLosers().then(response => {
      if (response.status == 401) {
        this.dispatchEvent(new CustomEvent('login', {bubbles: true, detail: 'login'}));
        return;
      } else {
        response.json();
      }
    })
    .then(data => {
    // we now have the API response available as an object

        this.losers = data;

    })
    .catch(err => {
      console.log(err);
    });
  }

  __onNavClicked(ev) {
    const page = ev.currentTarget.id.split('-')[1];
    this.dispatchEvent(new CustomEvent('navigate', {detail: page}));
  }

  render() {
    return html`
   home page
   <button @click="${this.handleClick}">Click it</button>
         <ul>
           ${this.losers.map(loser => html`<li>${loser.companyName}</li>`)}
         </ul>
    `;
  }

//  login(ev) {
//    ev.preventDefault();
//    this.page = ev.detail;
//  }

}

customElements.define('page-home', PageHome);
