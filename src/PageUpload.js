import { LitElement, html, css } from 'lit-element';
import { PersonList } from './PersonList.js';
import { PersonItem } from './PersonItem.js';
import {styleMap} from 'lit-html/directives/style-map.js';
import {classMap} from 'lit-html/directives/class-map.js';

export class PageUpload extends LitElement {

  static get properties() {
    return {
      fileName: {type: String},
      firstName: {type: String},
      surname: {type: String},
    };
  }

  constructor() {
    super();
    this.fileName = ""
    this.firstName = "martin";
    this.surname = "etherton";
  }

  connectedCallback() {
    super.connectedCallback();
  }

  static get styles() {
    return css`
    `;
  }

  fileChanged(ev) {
    this.fileName = ev.currentTarget.value;
  }

  navigatePage(ev) {
    this.dispatchEvent(new CustomEvent('navigate', { detail: ev.currentTarget.id }));
  }

  async uploadFile(url = '', data = {}) {

    const formData  = new FormData();
    formData.append('myFile',this.shadowRoot.getElementById('file').files[0]);
    formData.append('firstName', this.shadowRoot.getElementById('firstName').value);
    formData.append('surname', this.shadowRoot.getElementById('surname').value);


    //const path = APP_CONFIG.BASE_API_URL + '/api/upload';
    const path = 'https://www.martinetherton.com' + '/api/upload';
    const response = await fetch(path, {
      credentials: 'include',
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors',
      body: formData
    });
    return response; // parses JSON response into native JavaScript objects
  }

  upload(ev) {
    this.uploadFile('http://www.martinetherton.com:8080/login', { answer: 42 })

    //this.postData('https://www.martinetherton.com:8443/login', { answer: 42 })
      .then(response => {
        if (response.status == 418) {
          console.log("failed to login");
          this.loginError = true;
          return;
        } else if (response.status == 200) {
          this.dispatchEvent(new CustomEvent('loggedIn', {bubbles: true, detail: 'home'}));
          return response.json();
        }
      })
      .then(data => {
        if (data) {
          Login.xCsrfToken = data.xCsrfToken;
        }
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
    <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-deep-orange.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <main class="w3-animate-right">
        <div class="w3-card-4 w3-container w3-padding-16">
          <header class="w3-container; w3-row" style="background:#03DAC6; padding-left: 16px">
            <h4>Upload GEDCOM file</h4>
          </header>
          <div class="w3-container">
            <form id="upload" action="http://localhost:8080/upload" method="post" enctype="multipart/form-data">
              <p>
                <input id="file" @change="${this.fileChanged}" name="myFile" type="file">
              </p>
              <p>
                <input @click="${this.upload}" style="background:#03DAC6" class="w3-btn w3-block" type="submit" value="Submit">
              </p>
            </form>
          </div>
        </div>


    </main>
    `;
  }

}

customElements.define('page-upload', PageUpload);
