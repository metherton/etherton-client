import { css } from '@lion/core';
import { LitElement, html } from 'lit-element';

export class PersonItem extends LitElement {

  static get properties() {
    return {
      name: String,
      address: String,
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
    <section style="width:50%"><h4>Birth</h4>${this.address}
    </section>
    <section style="width:50%"><h4>Residence</h4>${this.birthDate}
    </section>`;
  }
}
customElements.define('person-item', PersonItem);
