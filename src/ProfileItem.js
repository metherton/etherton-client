import { css } from '@lion/core';
import { LitElement, html } from 'lit-element';

export class ProfileItem extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`<slot>profile item</slot>`;
  }
}
customElements.define('profile-item', ProfileItem);
