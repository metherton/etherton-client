import { css } from '@lion/core';
import { LitElement, html } from 'lit-element';

export class PersonItem extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`<slot>person item</slot>`;
  }
}
customElements.define('person-item', PersonItem);
