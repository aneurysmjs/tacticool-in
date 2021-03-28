import React, { ReactElement } from 'react';
import { render, cleanup, fireEvent, RenderResult, act } from '@testing-library/react';

import Sidebar from './Sidebar';

const Content = (): ReactElement => <div>some content</div>;

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe('Sidebar', () => {
  it('should render "null" when is close', () => {
    const { container } = render(
      <Sidebar>
        <Content />
      </Sidebar>,
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render sidebar\'s content and animate it by default from "right"', async () => {
    let testRenderer = {} as RenderResult;

    await act(async () => {
      testRenderer = render(
        <Sidebar isOpen>
          <Content />
        </Sidebar>,
      );
    });

    const { getByTestId } = testRenderer;
    const overlay = getByTestId('overlay');
    const sidebar = getByTestId('sidebar');
    const content = getByTestId('content');

    expect(overlay).not.toEqual(null);
    expect(sidebar).not.toEqual(null);

    expect(sidebar.className).toEqual('sidebar sidebar--right sidebar--open-right');
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(content.firstChild.innerHTML).toEqual('some content');
  });

  it('should render sidebar\'s content and animate it from "left"', async () => {
    let testRenderer = {} as RenderResult;

    await act(async () => {
      testRenderer = render(
        <Sidebar isOpen side="left">
          <Content />
        </Sidebar>,
      );
    });

    const { getByTestId } = testRenderer;
    const overlay = getByTestId('overlay');
    const sidebar = getByTestId('sidebar');
    const content = getByTestId('content');

    expect(overlay).not.toEqual(null);
    expect(sidebar).not.toEqual(null);
    expect(sidebar.className).toEqual('sidebar sidebar--left sidebar--open-left');
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(content.firstChild.innerHTML).toEqual('some content');
  });

  xit('should close the sidebar when click the "close" icon', async () => {
    let open = true;

    const handleOnClose = jest.fn(() => {
      open = !open;
    });

    let testRenderer = {} as RenderResult;

    await act(async () => {
      testRenderer = render(
        <Sidebar isOpen={open} side="left" onClose={handleOnClose}>
          <Content />
        </Sidebar>,
      );
    });

    const { queryByTestId, rerender } = testRenderer;

    const closeIcon = queryByTestId('close') as NonNullable<HTMLElement>;
    const openedSidebar = queryByTestId('sidebar');

    expect(openedSidebar).not.toEqual(null);

    console.log('open before', open);
    fireEvent.click(closeIcon);
    console.log('open after', open);

    expect(handleOnClose.mock.calls.length).toBe(1);
    // re-render "closed" sidebar (open = false)
    rerender(
      <Sidebar isOpen={open} side="left" onClose={handleOnClose}>
        <Content />
      </Sidebar>,
    );

    const closedSidebar = queryByTestId('sidebar');

    expect(closedSidebar).toEqual(null);
  });
});
