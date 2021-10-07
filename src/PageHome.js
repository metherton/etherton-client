import { LitElement, html, css } from 'lit-element';
import { PersonList } from './PersonList.js';
import { PageSearch } from './PageSearch.js';

export class PageHome extends LitElement {

  static get properties() {
    return {
      branches: {type: Array}
    };
  }

  constructor() {
    super();
    this.branches = [];
  }

  connectedCallback() {
    super.connectedCallback();
//    this.getBranches()
//    .then(response => response.json())
//    .then(data => {
//      this.branches = data
//    })
//    .catch(err => {
//      console.log(err);
//    });
  }

//  handlePersons() {
//    this.getPersons().then(response => {
//      return response.json();
//    })
//    .then(data => {
//      this.persons = data;
//    })
//    .catch(err => {
//      console.log(err);
//    });
//  }

  async getBranches() {
    const response = await fetch(APP_CONFIG.BASE_API_SECURE_URL + '/api/branches', {
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

  blaHome() {
    console.log('blahome says hi');
  }

  formatName(firstName, surname) {
    return firstName + " " + surname
  }

  formatAddress(address, city, country) {
    return address + ", " + city + ", " + country;
  }

  formatBirthDate(birthDate) {
    return new Date(birthDate).toLocaleDateString("en-US");
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
      <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-indigo.css">
      <page-search></page-search>
    `;
  }

}

customElements.define('page-home', PageHome);
