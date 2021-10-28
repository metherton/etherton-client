import { LitElement, html, css } from 'lit-element';
import { PersonList } from './PersonList.js';
import { PageSearch } from './PageSearch.js';

export class PageAbout extends LitElement {

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
    const response = await fetch(APP_CONFIG.BASE_API_URL + '/api/branches', {
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
        * {
          box-sizing: border-box;
        }

        .row::after {
          content: "";
          clear: both;
          display: block;
        }

        [class*="col-"] {
          float: left;
          padding: 15px;
        }

        html {
          font-family: "Lucida Sans", sans-serif;
        }

        .header {
          background-color: #9933cc;
          color: #ffffff;
          padding: 15px;
        }

        .menu ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }

        .menu li {
          padding: 8px;
          margin-bottom: 7px;
          background-color: #33b5e5;
          color: #ffffff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        }

        .menu li:hover {
          background-color: #0099cc;
        }

        .aside {
          background-color: #33b5e5;
          padding: 15px;
          color: #ffffff;
          text-align: center;
          font-size: 14px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        }

        .footer {
          background-color: #0099cc;
          color: #ffffff;
          text-align: center;
          font-size: 12px;
          padding: 15px;
        }

        /* For desktop: */
        .col-1 {width: 8.33%;}
        .col-2 {width: 16.66%;}
        .col-3 {width: 25%;}
        .col-4 {width: 33.33%;}
        .col-5 {width: 41.66%;}
        .col-6 {width: 50%;}
        .col-7 {width: 58.33%;}
        .col-8 {width: 66.66%;}
        .col-9 {width: 75%;}
        .col-10 {width: 83.33%;}
        .col-11 {width: 91.66%;}
        .col-12 {width: 100%;}

        @media only screen and (max-width: 768px) {
          /* For mobile phones: */
          [class*="col-"] {
            width: 100%;
          }
        }
      </style>

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
      <!-- Navbar on small screens (Hidden on medium and large screens) -->
      <div id="myNavbar" style="background: white">
        <div class="w3-bar w3-opacity w3-hover-opacity-off w3-center w3-small">
          <ul style="list-style-type:none;margin:0;padding:0">
            <li class="w3-bar-item w3-button" style="display: inline; width:20% !important">Home</li>
            <li class="w3-bar-item w3-button" style="display: inline; width:20% !important">About</li>
            <li class="w3-bar-item w3-button" style="display: inline; width:20% !important">ONS</li>
            <li class="w3-bar-item w3-button" style="display: inline; width:20% !important">Photos</li>
            <li class="w3-bar-item w3-button" style="display: inline; width:20% !important">Contact</li>
          </ul>
        </div>
      </div>

      <div class="header">
        <h1>Chania</h1>
      </div>

      <div class="row">
        <div class="col-3 menu">
          <ul>
          <li>The Flight</li>
          <li>The City</li>
          <li>The Island</li>
          <li>The Food</li>
          </ul>
        </div>

        <div class="col-6">
          <h1>The City</h1>
          <p>Chania is the capital of the Chania region on the island of Crete. The city can be divided in two parts, the old town and the modern city.</p>
        </div>

        <div class="col-3 right">
          <div class="aside">
            <h2>What?</h2>
            <p>Chania is a city on the island of Crete.</p>
            <h2>Where?</h2>
            <p>Crete is a Greek island in the Mediterranean Sea.</p>
            <h2>How?</h2>
            <p>You can reach Chania airport from all over Europe.</p>
          </div>
        </div>
      </div>

      <div class="footer">
        <p>Resize the browser window to see how the content respond to the resizing.</p>
      </div>


      <div class="w3-padding-large" id="main">
        <!-- Header/Home -->
        <header class="w3-container w3-padding-32 w3-center w3-black" id="home">
          <h1 class="w3-jumbo"><span class="w3-hide-small">Martin Etherton</span></h1>
          <h4 class="w3-xxlarge"><span class="w3-hide-small">Full stack developer</span></h3>
          <img src="/images/mart.png" alt="me" class="w3-image" width="992" height="1108">
        </header>
      </div>
    `;
  }


}

customElements.define('page-about', PageAbout);
