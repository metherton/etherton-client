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
      surname: {type: String},
      tree: {type: String}
    };
  }

  constructor() {
    super();
    this.persons = [];
    this.showSearch = true;
    this.firstName = "";
    this.surname = "etherton";
    this.tree = "";
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

  treePart() {
    if (this.tree === "") {
      return "";
    } else {
      return "/" + this.tree;
    }
  }

  async getPersons() {
    const path = APP_CONFIG.BASE_API_URL + '/api/persons' + this.treePart();
    const response = await fetch(path, {
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

  treeChanged(ev) {
    this.tree = ev.currentTarget.value;
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
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3pro.css">
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3pro.css">
      <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-deep-orange.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <style>
        body, h1,h2,h3,h4,h5,h6
        .w3-row-padding img {margin-bottom: 12px}
        /* Set the width of the sidebar to 120px */
        .w3-sidebar {width: 120px;background: #222;}
        /* Add a left margin to the "page content" that matches the width of the sidebar (120px) */
        #main {margin-left: 120px}
        /* Remove margins from "page content" on small screens */
        @media only screen and (max-width: 600px) {#main {margin-left: 0}}
      </style>
      <!-- Page Content -->
      <div style=${styleMap(stylesButton)} class="w3-mobile w3-row-padding" style="cursor: pointer;">
        <ul class="w3-ul" style="color:#03DAC6;">
          <li class="w3-large"><i @click=${this._showSearch} class="fa fa-plus-circle"></i> Edit Search</li>
        </ul>
      </div>
      <main class="w3-animate-left" style=${styleMap(styles)} >
        <div class="w3-row-padding w3-card w3-mobile">
          <form>
            <p>
              <label for="firstName">First Name</label>
              <input id="firstName" @change="${this.firstNameChanged}" class="w3-input" .value="${this.firstName}" type="text">
            </p>
            <p>
              <label for="surname">Last Name</label>
              <input id="surname" @change="${this.surnameChanged}" class="w3-input" .value="${this.surname}" type="text">
            </p>
            <p>
              <label for="place">Place your ancestor might have lived</label>
              <input id="place" class="w3-input" type="text">
            </p>
            <p>
              <label for="year">Birth Year</label>
              <input id="year" class="w3-input" type="text">
            </p>
            <p>
              <label for="tree">Tree</label>
              <input id="tree" @change="${this.treeChanged}"  class="w3-input" type="text" .value="${this.tree}">
            </p>
            <p>
              <input style="background:#03DAC6" @click=${this._doSearch} class="w3-btn w3-block" type="button" value="Submit">
            </p>
          </form>
        </div>
      </main>
      <div style=${styleMap(stylesNumberOfResults)} class="w3-mobile w3-row-padding" >
        <h6 style="color:#03DAC6; text-align: center">&nbsp;${this.persons.length} results found</h6>
      </div>
      <main class="w3-animate-left w3-row-padding">
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
      </main>
    `;
  }

}

customElements.define('page-search', PageSearch);
