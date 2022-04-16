import { render } from '@testing-library/react';

import Spinner from './Spinner';

const defaultSize = '24px';

describe('Spinner', () => {
  it('should have "spinner" class and height and with equal to 24px', () => {
    const { container } = render(<Spinner />);
    const spinner = container.firstChild as HTMLDivElement;

    expect(spinner.style.height).toEqual(defaultSize);
    expect(spinner.style.width).toEqual(defaultSize);
    expect(spinner.className).toEqual('spinner');
  });
});
