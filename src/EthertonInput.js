import { css } from '@lion/core';
import { LionInput } from '@lion/input';

export class EthertonInput extends LionInput {
  static get styles() {
    return [
      super.styles,
      css`
        /* your styles here */
      `,
    ];
  }
}
customElements.define('etherton-input', EthertonInput);
