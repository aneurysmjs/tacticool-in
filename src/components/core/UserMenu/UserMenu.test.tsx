import React from 'react';
import { act, cleanup, RenderResult, fireEvent } from '@testing-library/react';

import renderWithFirebase from '~/utils/renderWithFirebase';

import UserMenu from './UserMenu';

afterEach(cleanup);

let testRenderer = {} as RenderResult;

beforeEach(async () => {
  await act(async () => {
    testRenderer = renderWithFirebase(<UserMenu />);
  });
});

describe('UserMenu', () => {
  it(`tests UserMenu's basics`, () => {
    const { container } = testRenderer;
    const userMenu = container.firstChild as HTMLElement;

    expect(userMenu.className).toEqual('user-menu');
  });

  it(`should open the sidebar`, async () => {
    const { queryByTestId } = testRenderer;
    const cartIcon = queryByTestId('cartIcon') as NonNullable<HTMLElement>;
    const noSidebar = document.body.querySelector('aside');

    expect(noSidebar).toBeNull();

    await act(async () => {
      fireEvent.click(cartIcon);
    });

    const sidebar = document.body.querySelector('aside');

    expect(sidebar).not.toBeNull();
  });
});
