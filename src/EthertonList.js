import { css } from '@lion/core';
import { LitElement, html } from 'lit-element';

export class EthertonList extends LitElement {
  static get styles() {
    return css`

    `;
  }

  render() {
    return html`<slot></slot>`;
  }

}
customElements.define('etherton-list', EthertonList);
