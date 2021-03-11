import { css } from '@lion/core';
import { LionButton } from '@lion/button';

export class EthertonButton extends LionButton {
  static get styles() {
    return [
      super.styles,
      css`
        /* your styles here */
      `,
    ];
  }
}
customElements.define('etherton-button', EthertonButton);
