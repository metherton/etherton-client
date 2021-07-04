import { css } from '@lion/core';
import { LitElement, html } from 'lit-element';

export class PersonItem extends LitElement {

  static get properties() {
    return {
      name: String
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
    <div style="display:flex;align-content:space-between;width:100%"><h4 style="width:50%">Birth</h4><h4 style="width:50%">Residence</h4></div>`;
  }
}
customElements.define('person-item', PersonItem);
