import { css } from '@lion/core';
import { LitElement, html } from 'lit-element';

export class EthertonListItem extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`<slot>item</slot>`;
  }
}
customElements.define('etherton-list-item', EthertonListItem);
