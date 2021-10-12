import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import {logInfo} from '/mocks/Logger.js';

import '../src/etherton-client.js';

describe('EthertonClient', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<etherton-client></etherton-client>`);
    logInfo.reset();
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot.querySelector('h1');
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('Etherton One Name Study');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('invokes renderPage when render is called', () => {
    element.callme();
    expect(logInfo.callCount).to.equal(1);
  })

});
