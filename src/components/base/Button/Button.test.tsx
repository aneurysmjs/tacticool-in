import { FunctionComponent } from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { PropsType } from './index';

describe('Button', () => {
  it('should render children', () => {
    const { getByText } = render(<Button>Ello world</Button>);

    const button = getByText('Ello world');

    expect(button.textContent).toBe('Ello world');
  });

  it('should render custom element', () => {
    const Link: FunctionComponent<PropsType> = (props: PropsType) => (
      <a href="/home" {...props}>
        {props.children}
      </a>
    );
    const { getByText } = render(<Button tag={Link}>Home</Button>);

    const link = getByText('Home') as HTMLAnchorElement;

    expect(link.textContent).toBe('Home');
    expect(link.href).toBe('http://localhost/home');
  });

  it('should render an anchor element if href exists', () => {
    const { getByText, container } = render(<Button href="/home">Home</Button>);

    const link = getByText('Home') as HTMLAnchorElement;

    expect(container.querySelectorAll('a').length).toBe(1);
    expect(link.tagName).toBe('A');
    expect(link.textContent).toBe('Home');
  });

  it('should render type as "submit" by default when tag is "button"', () => {
    const { container } = render(<Button>Home</Button>);

    const button = container.querySelector('button') as HTMLButtonElement;

    /**
     * For most browsers the default type of button is submit.
     *
     * Checkout @link https://stackoverflow.com/a/31644856/5378393
     */
    expect(button.type).toBe('submit');
    expect(button.textContent).toBe('Home');
  });

  it('should render type as "button" by default when tag is "button" and onClick is provided', () => {
    const { container } = render(<Button onClick={(): void => {}}>Home</Button>);

    const button = container.querySelector('button') as HTMLButtonElement;

    expect(button.type).toBe('button');
    expect(button.textContent).toBe('Home');
  });

  it('should render type as user defined when defined by the user', () => {
    const { container } = render(<Button type="submit">Home</Button>);

    const button = container.querySelector('button') as HTMLButtonElement;

    expect(button.type).toBe('submit');
    expect(button.textContent).toBe('Home');
  });

  it.skip('should not render type by default when the type is not defined and the tag is not "button"', () => {
    const { getByText } = render(<Button tag="a">Home</Button>);

    const anchor = getByText('Home');

    expect(anchor.type).toBe(undefined);
    expect(anchor.textContent).toBe('Home');
  });

  it('should not render type by default when the type is not defined and the href is defined', () => {
    const { container } = render(<Button href="#">Home</Button>);

    const anchor = container.querySelector('a') as HTMLAnchorElement;

    expect(anchor.type).toBe('');
    expect(anchor.textContent).toBe('Home');
  });

  it('should render buttons with default color', () => {
    const { getByText } = render(<Button>Default Button</Button>);

    const button = getByText('Default Button');

    expect(button.classList.contains('btn-secondary')).toBe(true);
  });

  it('should render buttons with other colors', () => {
    const { getByText } = render(<Button color="danger">Default Button</Button>);

    const button = getByText('Default Button');

    expect(button.classList.contains('btn-danger')).toBe(true);
  });

  it('should render buttons with outline variant', () => {
    const { getByText } = render(<Button outline>Default Button</Button>);

    const button = getByText('Default Button');
    expect(button.classList.contains('btn-outline-secondary')).toBe(true);
  });

  it('should render buttons with outline variant with different colors', () => {
    const { getByText } = render(
      <Button outline color="info">
        Default Button
      </Button>,
    );

    const button = getByText('Default Button');

    expect(button.classList.contains('btn-outline-info')).toBe(true);
  });

  it('should render buttons at different sizes', () => {
    const small = render(<Button size="sm">Small Button</Button>);
    const large = render(<Button size="lg">Large Button</Button>);

    const smallButton = small.getByText('Small Button');
    const largeButton = large.getByText('Large Button');

    expect(smallButton.classList.contains('btn-sm')).toBe(true);
    expect(largeButton.classList.contains('btn-lg')).toBe(true);
  });

  it('should render block level buttons', () => {
    const { getByText } = render(<Button block>Block Level Button</Button>);

    const blockButton = getByText('Block Level Button');

    expect(blockButton.classList.contains('btn-block')).toBe(true);
  });

  it('should render close icon utility with default props', () => {
    const times = '×'; // unicode: U+00D7 MULTIPLICATION SIGN
    const expectedInnerHTML = `<span aria-hidden="true">${times}</span>`;

    const { container } = render(<Button close />);

    const actualInnerHTML = container.firstChild?.innerHTML;

    expect(container.querySelectorAll('.close').length).toBe(1);
    expect(container.querySelectorAll('.btn').length).toBe(0);
    expect(container.querySelectorAll('.btn-secondary').length).toBe(0);
    expect(container.querySelector('button')?.getAttribute('aria-label')).toMatch(/close/i);
    expect(actualInnerHTML).toBe(expectedInnerHTML);
  });

  it('should render close icon with custom child and props', () => {
    const testChild = 'close this thing';
    const { container } = render(<Button close>{testChild}</Button>);

    expect(container.firstChild?.textContent).toEqual(testChild);
  });

  describe('onClick', () => {
    it('should call `onClick` if it exists', () => {
      const onClick = jest.fn();
      const { getByText } = render(<Button onClick={onClick}>Testing Click</Button>);

      const button = getByText('Testing Click');

      fireEvent.click(button);

      expect(onClick).toHaveBeenCalled();
    });

    it('should not called when disabled', () => {
      const onClick = jest.fn();

      const { getByText } = render(
        <Button disabled onClick={onClick}>
          Testing Click
        </Button>,
      );

      const button = getByText('Testing Click');

      fireEvent.click(button);

      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
