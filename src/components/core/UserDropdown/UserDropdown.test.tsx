import { act, cleanup, RenderResult, fireEvent } from '@testing-library/react';

import renderWithFirebase from '~/utils/renderWithFirebase';

import UserDropdown from './UserDropdown';

afterEach(cleanup);

let testRenderer = {} as RenderResult;

beforeEach(async () => {
  await act(async () => {
    testRenderer = renderWithFirebase(<UserDropdown />);
  });
});

describe('UserDropdown', () => {
  it(`tests UserDropdown's basics`, () => {
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
