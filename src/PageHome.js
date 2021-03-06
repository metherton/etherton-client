import { LitElement, html, css } from 'lit-element';
import { PersonList } from './PersonList.js';
import { PageSearch } from './PageSearch.js';

export class PageHome extends LitElement {

  static get properties() {
    return {
//      persons: {type: Array}
    };
  }

  constructor() {
    super();
//    this.persons = [];
  }

  connectedCallback() {
    super.connectedCallback();
//    this.getPersons()
//    .then(response => response.json())
//    .then(data => {
//      this.persons = data
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

//  async getPersons() {
//    const response = await fetch(APP_CONFIG.BASE_API_URL + '/persons', {
//      method: 'GET',
//      credentials: 'include',
//      mode: 'cors'
//    });
//    return response;
//  }

  static get styles() {
    return css`

    `;
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
