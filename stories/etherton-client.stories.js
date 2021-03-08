import { html } from 'lit-html';
import '../src/etherton-client.js';

export default {
  title: 'EthertonClient',
  component: 'etherton-client',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <etherton-client
      style="--etherton-client-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </etherton-client>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
