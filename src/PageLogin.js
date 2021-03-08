import { LitElement, html, css } from 'lit-element';


export class PageLogin extends LitElement {

  static get styles() {
    return css`
      :host {
        width: 100%;
      }
      article {
        padding: 5%;
      }
      mwc-list {
        text-align: left;
        width: 100%;
        margin-top: -8px;
      }
      .person {
        height: 100%;
      }
      .person p, h3 {
        padding: 0px;
        margin: 0px;
      }
      mwc-list-item {
        padding-top: 8px;
        padding-bottom: 8px;
      }
    `;
  }

  static get properties() {
    return {
      persons: {type: Array},
      firstName: {type: String},
      surname: {type: String},
    };
  }

  constructor() {
    super();
    this.persons = [];
  }

  __onNavClicked(ev) {
    const person = this.persons.find(p => p.id === ev.currentTarget.id);
    const father = this.persons.filter(p => p.childRelation.includes(person.parentRelation)).find(m => m.sex === "M")
    const mother = this.persons.filter(p => p.childRelation.includes(person.parentRelation)).find(m => m.sex === "F")
    if (father) {
      person.father = {name: father.firstName + " " + father.surname, id: father.id}
    } else {
      person.father = {};
    }
    if (mother) {
      person.mother = {name: mother.firstName + " " + mother.surname, id: mother.id}
    } else {
      person.mother = {};
    }
    store.dispatch(setPerson(person));
    this.dispatchEvent(new CustomEvent('navigate', {detail: 'person'}));
  }

  formatDate(timestamp) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(timestamp).toLocaleDateString('en-GB', options);
  }

  render() {
    return html`
     login page
    `;
  }

}

customElements.define('page-login', PageLogin);
