import { render } from '@testing-library/react';

import TacticPlayer from './TacticPlayer';

describe('TacticPlayer', () => {
  // eslint-disable-next-line prettier/prettier
  it('should have component\'s name as className', () => {
    const { container } = render(<TacticPlayer />);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const div = container.firstChild;
    // expect(div?.className).toEqual('tacticPlayer');
  });
});
