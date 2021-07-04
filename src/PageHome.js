import { LitElement, html, css } from 'lit-element';
import { PersonList } from './PersonList.js';
import { PersonItem } from './PersonItem.js';

export class PageHome extends LitElement {

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
//    this.getPersons()
//    .then(response => response.json())
//    .then(data => {
//      this.persons = data
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

//  async getPersons() {
//    const response = await fetch(APP_CONFIG.BASE_API_URL + '/persons', {
//      method: 'GET',
//      credentials: 'include',
//      mode: 'cors'
//    });
//    return response;
//  }

  static get styles() {
    return css`
    `;
  }
  render() {
    return html`
        ${this.persons?
        html`
        <person-list>
          ${this.persons.map(person => html`
          <person-item>${person.firstName}</person-item>
          `)}
        </person-list>`:
         html`no persons&nbsp;`}
    `;
  }

}

customElements.define('page-home', PageHome);
