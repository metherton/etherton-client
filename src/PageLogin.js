import { LitElement, html, css } from 'lit-element';
import '@material/mwc-textfield';
import '@material/mwc-button';
import '@material/mwc-icon';

export class PageLogin extends LitElement {

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
        <mwc-textfield outlined id="userName" label="User Name"></mwc-textfield>
      </mwc-formfield>
      <mwc-formfield label="Password">
        <mwc-textfield outlined id="password" type="password" label="Password"></mwc-textfield>
      </mwc-formfield>
      <mwc-formfield label="Login">
        <mwc-button id="login" raised label="Login"></mwc-button>
      </mwc-formfield>
    `;
  }

}

customElements.define('page-login', PageLogin);
