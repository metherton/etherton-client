import { css } from '@lion/core';
import { LitElement, html } from 'lit-element';

export class PersonItem extends LitElement {

  static get properties() {
    return {
      firstName: String,
      surname: String,
      birthDate: String,
      address: String,
      tree: String,
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .name {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .w3-padding-bottom-8 {
        padding-bottom: 8px;
      }
    `;
  }

  formatBirthDate() {;
    const d = new Date(this.birthDate);
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da}-${mo}-${ye}`;
  }

  render() {
    return html`
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-indigo.css">
    <div class="w3-text-theme w3-padding-bottom-8">
      <h2 class="w3-mobile name">${this.firstName}&nbsp;${this.surname}</h2>
      <div class="w3-mobile" style="display:flex;align-content:space-between;width:100%">
        <section style="width:20%"><h4>Tree</h4>${this.tree}
        </section>
        <section style="width:30%"><h4>Birth Date</h4>${this.formatBirthDate()}
        </section>
        <section style="width:50%"><h4>Residence</h4>${this.address}
        </section>
      </div>
    </div><hr>`;
  }
}
customElements.define('person-item', PersonItem);
