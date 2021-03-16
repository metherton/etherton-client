import { LitElement, html, css } from 'lit-element';
import { Login } from './login.js';
import { EthertonInput } from './EthertonInput.js';
import { EthertonButton } from './EthertonButton.js';

export class PageLogin extends LitElement {

  static get properties() {
    return {
      isLoggedIn: { type: Boolean },
      page: {type: String},
      previousPage: {type: String},
    };
  }

  static get styles() {
    return css`
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <etherton-input @change="${this.updateUserName}"></etherton-input>
      <etherton-input @change="${this.updatePassword}"></etherton-input>
      <etherton-button id="login" @click="${this.handleClick}">Login</etherton-button>
    `;
  }

  updateUserName(e) {
    this.userName = e.target.value;
  }

  updatePassword(e) {
    this.password = e.target.value;
  }


  // Example POST method implementation:
  async postData(url = '', data = {}) {
    // Default options are marked with *
    Login.authDetails = btoa(this.userName + ':' + this.password);
    const response = await fetch(url, {
          credentials: 'include',
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors',
//      mode: 'cors', // no-cors, *cors, same-origin
//      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//      credentials: 'same-origin', // include, *same-origin, omit
      headers: {

//        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Login.authDetails
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
//      redirect: 'follow', // manual, *follow, error
//      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
  }

  handleClick(e) {
    this.postData('https://localhost:8443/login', { answer: 42 })
    //this.postData('http://localhost:8080/login', { answer: 42 })
    //this.postData('https://www.martinetherton.com:8443/login', { answer: 42 })
      .then(response => {
        if (response.status == 200) {
          Login.isAuthenticated = true;
          for (var p of response.headers) {
            if (p[0] === 'x-csrf-token') {
              Login.xCsrfToken = p[1];
            }
          }
          this.dispatchEvent(new CustomEvent('loggedIn', {bubbles: true, detail: {page: 'home', xCsrfToken: Login && Login.xCsrfToken }}));
          return response.json();
        }
      })
      .then(data => {
        Login.userName = data.userName;
        Login.sessionId = data.sessionId;
      })
      .catch(err => {
        console.log(err);
      });
  }

}

customElements.define('page-login', PageLogin);
