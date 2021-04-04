import { render } from '@testing-library/react';

import TacticPlayer from './TacticPlayer';

describe('TacticPlayer', () => {
  it('should have component\'s name as className', () => {
    const { container } = render(<TacticPlayer />);
    const div = container.firstChild;
    expect(div.className).toEqual('tacticPlayer');
  });
});