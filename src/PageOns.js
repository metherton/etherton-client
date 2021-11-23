import { LitElement, html, css } from 'lit-element';
import { PersonList } from './PersonList.js';
import { PageBranch } from './PageBranch.js';
import { PageSearch } from './PageSearch.js';
import { PageUpload } from './PageUpload.js';
import { PageLondon1 } from './PageLondon1.js';
import { PersonItem } from './PersonItem.js';
import {styleMap} from 'lit-html/directives/style-map.js';
import {classMap} from 'lit-html/directives/class-map.js';

export class PageOns extends LitElement {

  static get properties() {
    return {
      page: {type: String},
      persons: {type: Array},
      showSearch: {type: Boolean},
      firstName: {type: String},
      surname: {type: String}
    };
  }

  constructor() {
    super();
    this.page = 'branch';
    this.persons = [];
    this.showSearch = true;
    this.firstName = "";
    this.surname = "etherton";
  }

  connectedCallback() {
    super.connectedCallback();
  }

  toggleSearch(ev) {
    this.page = "search";
    this._renderPage();
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
    const response = await fetch(APP_CONFIG.BASE_API_URL + '/api/persons', {
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


  navigatePage(ev) {
    this.page = ev.detail;
    this._renderPage();
  }

  _renderPage() {
    switch (this.page) {
      case 'branch':
        return html`
          <page-branch @navigate="${this.navigatePage}"></page-branch>
        `;
      case 'london1':
        return html`
          <page-london1></page-london1>
        `;
      case 'ons':
        return html`
          <page-ons></page-ons>
        `;
      case 'search':
        return html`
          <page-search></page-search>
        `;
      case 'upload':
        return html`
          <page-upload></page-upload>
        `;
      default:
        return html`
         <page-branch></page-branch>
        `;
    }
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
        .header {
          background-color: #6200EE;
          color: #ffffff;
          padding: 15px;
        }
      </style>
      <!-- Page Content -->
      <div class="header">
        <div class="w3-row">
          <div class="w3-col s11">
            <h3>Etherton One Name Study</h3>
          </div>
          <div class="w3-col s1" style="display:flex;justify-content: right;align-items: center;height:50px">
            <i @click=${this.toggleSearch} id="search" class="fa fa-search w3-large" style="float:right;clear: both; cursor: pointer"></i>
          </div>
        </div>
      </div>

         ${this._renderPage()}


    `;
  }

}

customElements.define('page-ons', PageOns);
