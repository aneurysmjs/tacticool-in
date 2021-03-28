import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act, cleanup, RenderResult } from '@testing-library/react';

import renderWithFirebase from '~/utils/renderWithFirebase';

import Header from './Header';

const headerCSS = 'd-flex vw-100 justify-content-between border-bottom bg-white';

afterEach(cleanup);

let testRenderer = {} as RenderResult;

beforeEach(async () => {
  await act(async () => {
    testRenderer = renderWithFirebase(
      <Router>
        <Header />
      </Router>,
    );
  });
});

describe('Header', () => {
  it(`tests header's basics`, async () => {
    const { container } = testRenderer;
    const header = container.firstChild as HTMLElement;

    expect(header.className).toEqual(headerCSS);
  });
});
