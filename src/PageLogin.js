import { LitElement, html, css } from 'lit-element';
import '@material/mwc-textfield';
import '@material/mwc-button';
import '@material/mwc-icon';
import { Login } from './login.js';

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
      mwc-formfield {
        display: block;
        margin-bottom: 1rem;
      }
      mwc-textfield {
        width: 100%;
      }
      mwc-button {
        width: 100%;
      }
      .fancy {
        color: #03a9f4;
        --mdc-icon-size: 100px;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <mwc-formfield>
        <mwc-icon class="fancy">account_circle</mwc-icon>
      </mwc-formfield>
      <mwc-formfield label="User Name">
        <mwc-textfield outlined id="userName" @change="${this.updateUserName}" label="User Name"></mwc-textfield>
      </mwc-formfield>
      <mwc-formfield label="Password">
        <mwc-textfield outlined id="password" type="password" @change="${this.updatePassword}" label="Password"></mwc-textfield>
      </mwc-formfield>
      <mwc-formfield label="Login">
        <mwc-button id="login" @click="${this.handleClick}" raised label="Login"></mwc-button>
      </mwc-formfield>
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
    Login.token = btoa(this.userName + ':' + this.password);
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(this.userName + ':' + this.password)
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
  }

  handleClick(e) {
    this.postData('https://localhost:8443/login', { answer: 42 })
      .then(response => {
        if (response.status == 200) {
          Login.isAuthenticated = true;
          this.dispatchEvent(new CustomEvent('loggedIn', {bubbles: true, detail: 'home'}));
          return;
        }
      });
  }

}

customElements.define('page-login', PageLogin);
