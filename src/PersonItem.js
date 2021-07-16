import { css } from '@lion/core';
import { LitElement, html } from 'lit-element';

export class PersonItem extends LitElement {

  static get properties() {
    return {
      firstName: String,
      surname: String,
      birthDate: String
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`<h2>${this.name}</h2>
    <div style="display:flex;align-content:space-between;width:100%">
    ${this.firstName}&nbsp;${this.surname}
    <section style="width:50%"><h4>Birth Date</h4>${this.birthDate}
    </section>
    <section style="width:50%"><h4>Residence</h4>${this.birthDate}
    </section>`;
  }
}
customElements.define('person-item', PersonItem);
