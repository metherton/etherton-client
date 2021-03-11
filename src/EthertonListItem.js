import { css } from '@lion/core';
import { LitElement, html } from 'lit-element';

export class EthertonListItem extends LitElement {
  static get styles() {
    return css`
      :host {
        min-height: 10vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
      }
    `;
  }

  render() {
    return html`<slot>item</slot>`;
  }
}
customElements.define('etherton-list-item', EthertonListItem);
