import { LitElement, html, css } from 'lit-element';

export class PageHome extends LitElement {

  constructor() {
    super();
 //   this.addEventListener('login', this.login);
  }

  connectedCallback() {
    super.connectedCallback();
          fetch('https://www.martinetherton.com:8443/secured') // the response is a stream, we need to parse it as json first
          .then(response => {
            if (response.status == 401) {
               this.dispatchEvent(new CustomEvent('login', {bubbles: true, detail: 'login'}));
            }
            response.json();
          })
          .then(response => {
          // we now have the API response available as an object
            console.log(response);
          })
          .catch(err => {
            console.log(err);
          });

  }

  clickHandler() {
      fetch('http://localhost:8080/secured') // the response is a stream, we need to parse it as json first
      .then(response => {
        if (response.status == 401) {
           this.dispatchEvent(new CustomEvent('login', {detail: 'login'}));
        }
        response.json();
      })
      .then(response => {
      // we now have the API response available as an object
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        margin: 0 auto;
        text-align: center;
      }
      .container {
        position: relative;
        max-width: 100%; /* Maximum width */
        margin: 0 auto; /* Center it */
      }
      .container .content {
        position: absolute; /* Position the background text */
        bottom: 50%; /* At the bottom. Use top:0 to append it to the top */
        background: rgb(0, 0, 0); /* Fallback color */
        background: rgba(0, 0, 0, 0.5); /* Black background with 0.5 opacity */
        color: #f1f1f1; /* Grey text */
        width: 100%; /* Full width */
      }

      mwc-list {
        width: 100%;
        font-weight: bold;
      }
      mwc-list-item {
        font-weight: bold;
      }

    `;
  }

  __onNavClicked(ev) {
    const page = ev.currentTarget.id.split('-')[1];
    this.dispatchEvent(new CustomEvent('navigate', {detail: page}));
  }

  render() {
    return html`
   home page
   <button @click="${this.clickHandler}">click</button>
    `;
  }

//  login(ev) {
//    ev.preventDefault();
//    this.page = ev.detail;
//  }

}

customElements.define('page-home', PageHome);
