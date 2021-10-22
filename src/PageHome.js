import { LitElement, html, css } from 'lit-element';
import { PersonList } from './PersonList.js';
import { PageSearch } from './PageSearch.js';

export class PageHome extends LitElement {

  static get properties() {
    return {
      branches: {type: Array}
    };
  }

  static get styles() {
    return css`
    `;
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

//  render() {
//    return html`
//      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
//      <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-indigo.css">
//      <page-search></page-search>
//    `;
//  }


  render() {
    return html`
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
      <div class="w3-padding-large" id="main">
        <!-- Header/Home -->
        <header class="w3-container w3-padding-32 w3-center w3-black" id="home">
          <h1 class="w3-jumbo"><span class="w3-hide-small">Martin Etherton</span></h1>
          <h3 class="w3-jumbo"><span class="w3-hide-small">Full stack developer</span></h3>
          <img src="/images/mart.png" alt="me" class="w3-image" width="992" height="1108">
        </header>
      </div>
    `;
  }


}

customElements.define('page-home', PageHome);
