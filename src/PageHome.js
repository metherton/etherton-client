import { LitElement, html, css } from 'lit-element';
import { PageLogin } from './PageLogin.js';
import { Login } from './login.js';
import { EthertonList } from './EthertonList.js';
import { EthertonListItem } from './EthertonListItem.js';

export class PageHome extends LitElement {

  static get properties() {
    return {
      losers: {type: Array},
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
      } else {
        return response.json();
      }
    })
    .then(data => {
      this.losers = data;
    })
    .catch(err => {
      console.log(err);
    });
  }

  async getLosers() {
    //fetch('https://www.martinetherton.com:8443/secured')
    const response = await fetch('https://localhost:8443/losers', {
      headers: {
        'Authorization': 'Basic ' + Login.authDetails
      }
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
