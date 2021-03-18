import { css } from '@lion/core';
import { LionButton } from '@lion/button';

export class EthertonButton extends LionButton {

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          border-radius: 1em;
          background-image: linear-gradient(to right, Green , ForestGreen);
          padding: 0.5em;
          width: 100%;
          display: flex;
          flex-direction: column;
        }
      `,
    ];
  }


}
customElements.define('etherton-button', EthertonButton);
