import { LitElement, html, css } from 'lit-element';
import { PersonList } from './PersonList.js';
import { PersonItem } from './PersonItem.js';
import {styleMap} from 'lit-html/directives/style-map.js';
import {classMap} from 'lit-html/directives/class-map.js';

export class PageSearch extends LitElement {

  static get properties() {
    return {
      persons: {type: Array},
      showSearch: {type: Boolean},
      firstName: {type: String},
      surname: {type: String}
    };
  }

  constructor() {
    super();
    this.persons = [];
    this.showSearch = true;
    this.firstName = "";
    this.surname = "etherton";
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
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({firstName: this.firstName, surname: this.surname})
    });
    return response;
  }

  _doSearch() {
    this.getPersons().then(response => {
      return response.json();
    })
    .then(data => {
      this.persons = data;
      if (this.persons.length > 0) {
        this.showSearch = false;
      }
      this.showNumberOfResults = true;
    })
    .catch(err => {
      console.log(err);
    });
  }

  _showSearch() {
    this.showSearch = true;
  }

  firstNameChanged(ev) {
    this.firstName = ev.currentTarget.value;
  }

  surnameChanged(ev) {
    this.surname = ev.currentTarget.value;
  }


  render() {

    const styles = {
      display: this.showSearch ? "block" : "none"
    };

    const stylesButton = {
      display: this.showSearch ? "none" : "block"
    };

    const stylesNumberOfResults = {
      display: this.showNumberOfResults ? "block" : "none"
    };

    return html`
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
      <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-indigo.css">

      <div style=${styleMap(stylesNumberOfResults)} class="w3-mobile">
        <h6 class="w3-theme-l2">&nbsp;${this.persons.length} results found</h6>
      </div>

      <div style=${styleMap(stylesButton)} class="w3-mobile">
        <a @click=${this._showSearch}  class="w3-button w3-ripple w3-circle w3-theme">+</a>&nbsp;Edit Search
      </div>

      <div class="w3-mobile" style=${styleMap(styles)}>

        <div class="w3-container w3-theme-l4">
          <h2>Search Criteria</h2>
        </div>
        <form class="w3-container">
          <p>
            <label>First Name</label>
            <input @change="${this.firstNameChanged}" class="w3-input" .value="${this.firstName}" type="text">
          </p>
          <p>
            <label>Last Name</label>
            <input @change="${this.surnameChanged}" class="w3-input" .value="${this.surname}" type="text">
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
          .address=${person.address}
          .tree=${person.tree}></person-item>
        `)}
      </person-list>
    `;
  }

}

customElements.define('page-search', PageSearch);
