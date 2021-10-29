import { LitElement, html, css } from 'lit-element';
import { PersonList } from './PersonList.js';
import { PageSearch } from './PageSearch.js';

export class PageHome extends LitElement {

  static get properties() {
    return {
      branches: {type: Array},
      page: {type: String}
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

  navigatePage(ev) {
    this.page = ev.currentTarget.id;
    this.dispatchEvent(new CustomEvent('navigate', { detail: this.page }));
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
        .w3-card {
          box-shadow: none;
          padding: 10px;
        }
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
//          background-color: #9933cc;
//          color: #ffffff;
          padding: 15px;
        }

        .menu ul {
          background: black;
          color: white;
          list-style-type: none;
          margin: 0;
          padding: 0;
        }

        .menu li {
          padding: 8px;
          margin-bottom: 7px;
          background-color: black;
          color: white;
//          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        }

//        .menu li:hover {
//          background-color: #0099cc;
//        }

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
      <div id="myNavbar" style="background: black;color: white; font-weight: bold">
        <div class="w3-bar w3-center w3-small">
          <ul style="list-style-type:none;margin:0;padding:0">
            <li @click=${this.navigatePage} id="home" class="w3-bar-item w3-button" style="display: inline; width:20% !important">Home</li>
            <li @click=${this.navigatePage} id="about"  class="w3-bar-item w3-button" style="display: inline; width:20% !important">About</li>
            <li @click=${this.navigatePage} id="ons" class="w3-bar-item w3-button" style="display: inline; width:20% !important">ONS</li>
            <li @click=${this.navigatePage} id="photos" class="w3-bar-item w3-button" style="display: inline; width:20% !important">Photos</li>
            <li @click=${this.navigatePage} id="contact" class="w3-bar-item w3-button" style="display: inline; width:20% !important">Contact</li>
          </ul>
        </div>
      </div>

      <div  style="padding-top: 5px; padding-bottom: 5px" class="header">
        <h3>Welcome to martinetherton.com</h3>
      </div>

      <div class="row">
        <div class="col-3">
          <div class="w3-card">
            <img style="width: 100%; height: auto" src="/images/mart.png" alt="me" class="w3-image" width="992" height="1108">
            <div class="w3-container w3-center">
              <h1>Martin Etherton</h1>
              <h5>Full Stack Developer</h5>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="w3-card">
            <img style="width: 100%; height: auto" src="/images/guildbanner.gif" alt="goons" class="w3-image" width="153" height="395">
            <div class="w3-container w3-center">
              <h2>Etherton One Name Study</h2>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="w3-card">
              <h3>Photos</h3>
              <img style="width: 100%; height: auto" src="/images/pop.png" alt="pop" class="w3-image" width="650" height="1019">
          </div>
        </div>
        <div class="col-3">
          <div class="w3-card">
            <div class="w3-container w3-center">
              <h3>Contact Me</h3>
            </div>
            <div style="display:flex;justify-content:space-between" class="w3-container">
              <div>
                <i class="fa fa-twitter w3-xxlarge"></i>
              </div>
              <div>
                <i class="fa fa-linkedin w3-xxlarge"></i>
              </div>
              <div>
                <i class="fa fa-github w3-xxlarge"></i>
              </div>
              <div>
                <i class="fa fa-envelope w3-xxlarge"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <p>Resize the browser window to see how the content respond to the resizing.</p>
      </div>
    `;
  }


}

customElements.define('page-home', PageHome);
