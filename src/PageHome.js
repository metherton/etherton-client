import { LitElement, html, css } from 'lit-element';
import { PageLogin } from './PageLogin.js';
import { Login } from './login.js';
import { ProfileList } from './ProfileList.js';
import { ProfileItem } from './ProfileItem.js';

export class PageHome extends LitElement {

  static get properties() {
    return {
      profiles: {type: Array}
    };
  }

  constructor() {
    super();
    this.profiles = [];
  }

  connectedCallback() {
    super.connectedCallback();
  }

  handleProfiles() {
    this.getProfiles().then(response => {
      return response.json();
    })
    .then(data => {
      this.profiles = data;
    })
    .catch(err => {
      console.log(err);
    });
  }

  async getProfiles() {
    const response = await fetch(APP_CONFIG.BASE_API_URL + '/profiles', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    });
    return response;
  }

  async getLosers() {
    let body = 'xCsrfToken=' + Login.xCsrfToken || "";
    //fetch('https://www.martinetherton.com:8443/secured')
   // const response = await fetch('https://localhost:8443/losers', {
    //const response = await fetch('https://www.martinetherton.com:8443/losers', {
    const response = await fetch(APP_CONFIG.BASE_API_URL + '/losers', {
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
    fetch(APP_CONFIG.BASE_API_URL + '/logout', {
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
        ${this.profiles?
        html`
        <profile-list>
          ${this.profiles.map(profile => html`
          <profile-item>${profile.description}</profile-item>
          `)}
        </profile-list>`:
         html`no companies&nbsp;`}
    `;
  }

}

customElements.define('page-home', PageHome);
