import { LitElement, html, css } from 'lit-element';
import { PersonList } from './PersonList.js';
import { PersonItem } from './PersonItem.js';

export class PageSearch extends LitElement {

  static get properties() {
    return {
      persons: {type: Array}
    };
  }

  constructor() {
    super();
    this.persons = [];
  }

  connectedCallback() {
    super.connectedCallback();
  }

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

  async getPersons() {
    const response = await fetch(APP_CONFIG.BASE_API_SECURE_URL + '/api/persons', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    });
    return response;
  }

  _doSearch() {
    this.getPersons().then(response => {
      return response.json();
    })
    .then(data => {
      this.persons = data;

    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
      <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-indigo.css">
      <div class="w3-container w3-margin">

        <div class="w3-container w3-theme-l4">
          <h2>Search Criteria</h2>
        </div>
        <form class="w3-container">
          <p>
            <label>First Name</label>
            <input class="w3-input" type="text">
          </p>
          <p>
            <label>Last Name</label>
            <input class="w3-input" type="text">
          </p>
          <p>
            <label>Place your ancestor might have lived</label>
            <input class="w3-input" type="text">
          </p>
          <p>
            <label>Birth Year</label>
            <input class="w3-input" type="text">
          </p>
          <p>
            <input @click=${this._doSearch} class="w3-btn w3-block w3-theme-d1" type="button" value="Submit">
          </p>
        </form>
      </div>
      <person-list>
        ${this.persons.map(person => html`
        <person-item
          .firstName=${person.firstName}
          .surname=${person.surname}
          .birthDate=${person.dateOfBirth}
          .address=${person.address}></person-item>
        `)}
      </person-list>
    `;
  }

}

customElements.define('page-search', PageSearch);
