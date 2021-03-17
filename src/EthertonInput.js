import { css } from '@lion/core';
import { LionInput } from '@lion/input';

export class EthertonInput extends LionInput {
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          border-radius: 1em;
          border: 0.1em solid lightgrey;
          padding: 0.5em;
          width: 100%;
          background: white;
        }
        ::slotted(input) {
          height: 100%;
          outline: none;
          border-top-style: hidden;
          border-right-style: hidden;
          border-left-style: hidden;
          border-bottom-style: hidden;
        }

      `,
    ];
  }



}
customElements.define('etherton-input', EthertonInput);
