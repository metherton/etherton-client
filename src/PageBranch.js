import { LitElement, html, css } from 'lit-element';
import { PersonList } from './PersonList.js';
import { PersonItem } from './PersonItem.js';
import {styleMap} from 'lit-html/directives/style-map.js';
import {classMap} from 'lit-html/directives/class-map.js';

export class PageBranch extends LitElement {

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

  async tryUpload() {
    const response = await fetch(APP_CONFIG.BASE_LOGIN_API_URL + '/api/upload', {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
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
    this.dispatchEvent(new CustomEvent('navigate', { detail: ev.currentTarget.id }));
  }

  upload() {
    this.tryUpload().then(response => {
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
       <main class="w3-animate-left">
        <div class="w3-card-4 w3-container w3-padding-16">
          <header class="w3-container; w3-row" style="background:#03DAC6; padding-left: 16px">
            <div class="w3-col s11">
              <h4 style="cursor: pointer" @click=${this.navigatePage} id="london1">London 1 Branch</h4>
            </div>
            <div class="w3-col s1" style="display:flex;justify-content: right;align-items: center;height:50px; padding-right: 16px">
              <i @click=${this.navigatePage} id="upload" class="fa fa-download w3-large" style="float:right;clear: both; cursor: pointer"></i>
            </div>
          </header>
          <div class="w3-container">
            <p>The oldest common ancestor of this branch is Samuel Etherton, who is believed to have been born in 1814 in London (St.Giles)</p>
            <p>According to the baptism details his mother was Charlotte Etherton and his father unknown. Charlotte Etherton was born in 1787 in London (St.Giles) and her father was John Atherton, born in 1750 in Wigan, Lancashire</p>
            <p>Samuel married Mary Rogers of Bristol in 1836, in Bethnal Green, London. They had at least 5 children, 3 of whom survived through to adulthood. Of these, Samuel James Etherton born 1837 in London (St.Luke) is the ancesor whose descendents make up the majority of this tree.</p>
          </div>
        </div>
        <div class="w3-card-4 w3-container w3-padding-16">
          <header class="w3-container" style="background:#03DAC6">
            <h4>USA 1 Branch</h4>
          </header>
          <div class="w3-container">
            <p>Lorem ipsum...</p>
          </div>
        </div>
        <div class="w3-card-4 w3-container w3-padding-16">
          <header class="w3-container" style="background:#03DAC6">
            <h4>London 2 Branch</h4>
          </header>
          <div class="w3-container">
            <p>Lorem ipsum...</p>
          </div>
        </div>
        <div class="w3-card-4 w3-container w3-padding-16">
          <header class="w3-container" style="background:#03DAC6">
            <h4>Sussex 1 Branch</h4>
          </header>
          <div class="w3-container">
            <p>Lorem ipsum...</p>
          </div>
        </div>
        <div class="w3-card-4 w3-container w3-padding-16">
          <header class="w3-container" style="background:#03DAC6">
            <h4>Sussex 2 Branch</h4>
          </header>
          <div class="w3-container">
            <p>Lorem ipsum...</p>
          </div>
        </div>
        <div class="w3-card-4 w3-container w3-padding-16">
          <header class="w3-container" style="background:#03DAC6">
            <h4>Essex 1 Branch</h4>
          </header>
          <div class="w3-container">
            <p>Lorem ipsum...</p>
          </div>
        </div>
      </main>
    `;
  }

}

customElements.define('page-branch', PageBranch);
