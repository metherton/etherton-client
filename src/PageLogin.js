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
      loginError: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      :host {
        background-image: linear-gradient(to right, DarkRed , FireBrick);
        position: fixed;
        padding: 0;
        margin: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
      }

      .box-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 100%;
        width: 35%;
      }

      .header {
        height: 55%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .box {
        border-radius: 1.5em;
        width: 100%;
        height: 60%;
        background-image: linear-gradient(to right, HoneyDew , Ivory);
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .form-container {
        display: flex;

      }

      .form {
        height: 40%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }

      etherton-button {
        font-size: 1.5em;
        color: black;
        width: 75%;
      }

      etherton-input {
        width:80%;
      }

      etherton-button:hover {
        background: darkgreen;
        cursor: pointer;
      }

      .title, .login {
        text-align: center;
        font-weight: lighter;
      }

      .error {
        text-align: center;
        color: red;
      }

    `;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.loginError = false;
  }

  render() {
    return html`
      <div class="box-container">
        <main class="box"}>
          <main class="header">
            <h1 class="title">Welcome to Share News</h1>
            <h3 class="error">${this.getUserMessage()}</h3>
            <h2 class="login">Sign in</h2>
          </main>
          <main class="form">
            <etherton-input @change="${this.updateUserName}"></etherton-input>
            <etherton-input type="password" @change="${this.updatePassword}"></etherton-input>
            <etherton-button id="login" @click="${this.handleClick}">Login</etherton-button>
          </main>
        </main>
      </div>

    `;
  }

  getUserMessage() {
    if (this.loginError) {
      return html`Incorrect user name or password`;
    } else {
      return html``;
    }
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
      headers: {
        'Authorization': 'Basic ' + Login.authDetails
      },
    });
    return response; // parses JSON response into native JavaScript objects
  }

  handleClick(e) {
    //this.postData('https://localhost:8443/login', { answer: 42 })
    //this.postData('http://localhost:8080/login', { answer: 42 })
    this.postData('https://www.martinetherton.com:8443/login', { answer: 42 })
      .then(response => {
        if (response.status == 418) {
          console.log("failed to login");
          this.loginError = true;
          return;
        } else if (response.status == 200) {
          this.dispatchEvent(new CustomEvent('loggedIn', {bubbles: true, detail: 'home'}));
          return response.json();
        }
      })
      .then(data => {
        if (data) {
          Login.xCsrfToken = data.xCsrfToken;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

}

customElements.define('page-login', PageLogin);
