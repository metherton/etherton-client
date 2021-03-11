import { css } from '@lion/core';
import { LitElement, html } from 'lit-element';

export class EthertonList extends LitElement {
  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: block;
        align-items: center;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
      }
    `;
  }

  render() {
    return html`<slot></slot>`;
  }

}
customElements.define('etherton-list', EthertonList);
