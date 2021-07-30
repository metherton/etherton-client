import { css } from '@lion/core';
import { LitElement, html } from 'lit-element';

export class PersonItem extends LitElement {

  static get properties() {
    return {
      firstName: String,
      surname: String,
      birthDate: String,
      address: String,
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  formatBirthDate() {
    return new Date(this.birthDate).toLocaleDateString("en-US");
  }

  render() {
    return html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-indigo.css">
      <div class="w3-container w3-mobile">
        <div class="w3-card w3-margin w3-padding-16 w3-theme-l4">
          <h2 class="w3-mobile w3-margin">${this.firstName}&nbsp;${this.surname}</h2>
          <div class="w3-mobile w3-margin" style="display:flex;align-content:space-between;width:100%">
            <section style="width:50%"><h4>Birth Date</h4>${this.formatBirthDate()}
            </section>
            <section style="width:50%"><h4>Residence</h4>${this.address}
            </section>
          </div>
        </div>
      </div>`;
  }
}
customElements.define('person-item', PersonItem);
