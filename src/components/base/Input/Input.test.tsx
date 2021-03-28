/* eslint-disable no-template-curly-in-string */
import React from 'react';
import { render } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  it('should render with "input" tag when no type is provided', () => {
    const { container } = render(<Input />);

    expect(container.firstElementChild?.tagName).toBe('INPUT');
  });

  it('should render with "type" tag when type is "select"', () => {
    const { container } = render(<Input type="select">Yo!</Input>);

    expect(container.firstElementChild?.tagName).toBe('SELECT');
  });

  it('should render with "textarea" tag when type is "textarea"', () => {
    const { container } = render(<Input type="textarea" />);

    expect(container.firstElementChild?.tagName).toBe('TEXTAREA');
  });

  it('should render with "input" tag when plaintext prop is truthy', () => {
    const { container } = render(<Input plaintext type="select" />);

    expect(container.firstElementChild?.tagName).toBe('INPUT');
  });

  it('should render with "form-control-plaintext" class when plaintext prop is truthy', () => {
    const { container } = render(<Input plaintext type="select" />);

    expect(container.firstElementChild?.classList.contains('form-control-plaintext')).toBe(true);
  });

  it('should not render with "form-control" class when plaintext prop is truthy', () => {
    const { container } = render(<Input plaintext type="select" />);

    expect(container.firstElementChild?.classList.contains('form-control')).toBe(false);
  });

  it('should render with custom tag when plaintext prop is truthy and tag is provided', () => {
    const { container } = render(<Input plaintext tag="div" type="select" />);

    expect(container.firstElementChild?.tagName).toBe('DIV');
  });

  it('should render with custom tag when plaintext prop is not truthy and tag is provided', () => {
    const { container } = render(<Input tag="div" />);

    expect(container.firstElementChild?.tagName).toBe('DIV');
  });

  it('should render with "input" tag when type is not a special case', () => {
    const { container } = render(<Input type="email" />);

    expect(container.firstElementChild?.tagName).toBe('INPUT');
  });

  it('should not render children', () => {
    const { container } = render(<Input>Yo!</Input>);

    expect(container.firstElementChild?.textContent).toBe('');
  });

  it('should render without children when type is "textarea"', () => {
    const { container } = render(<Input type="textarea">Yo!</Input>);

    expect(container.firstElementChild?.textContent).toBe('');
  });

  it('should render children when type is select', () => {
    const { container } = render(<Input type="select">Yo!</Input>);

    expect(container.firstElementChild?.textContent).toBe('Yo!');
  });

  it('should render children when tag is select', () => {
    const { container } = render(<Input tag="select">Yo!</Input>);

    expect(container.firstElementChild?.textContent).toBe('Yo!');
  });

  it('should pass children when tag is a custom component', () => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const { container } = render(<Input tag={(props) => props.children}>Yo!</Input>);

    expect(container.textContent).toBe('Yo!');
  });

  it('should not render with "is-invalid" class when valid is false', () => {
    const { container } = render(<Input valid={false} />);

    expect(container.firstElementChild?.classList.contains('is-invalid')).toBe(false);
  });

  it('should not render with "is-valid" class when invalid is false', () => {
    const { container } = render(<Input invalid={false} />);

    expect(container.firstElementChild?.classList.contains('is-valid')).toBe(false);
  });

  it('should render with "is-invalid" class when invalid is true', () => {
    const { container } = render(<Input invalid />);

    expect(container.firstElementChild?.classList.contains('is-invalid')).toBe(true);
  });

  it('should render with "is-valid" class when valid is true', () => {
    const { container } = render(<Input valid />);

    expect(container.firstElementChild?.classList.contains('is-valid')).toBe(true);
  });

  it('should render with "form-control-${bsSize}" class when bsSize is "lg" or "sm"', () => {
    const { container } = render(<Input bsSize="lg" />);

    expect(container.firstElementChild?.classList.contains('form-control-lg')).toBe(true);
  });

  it('should render with "form-control" class when size is nor "lg" nor "sm"', () => {
    const { container } = render(<Input bsSize="5" />);

    expect(container.firstElementChild?.classList.contains('form-control-sm')).toBe(false);
    expect(container.firstElementChild?.classList.contains('form-control-lg')).toBe(false);
    expect(container.firstElementChild?.classList.contains('form-control')).toBe(true);
  });

  it('should render with "form-control-${bsSize}" class when bsSize is provided', () => {
    const { container } = render(<Input bsSize="sm" />);

    expect(container.firstElementChild?.classList.contains('form-control-sm')).toBe(true);
  });

  it('should render with "form-control" class by default', () => {
    const { container } = render(<Input />);

    expect(container.firstElementChild?.classList.contains('form-control')).toBe(true);
  });

  it('should not render with "form-control-file" nor "form-control-plaintext" nor "form-check-input" class by default', () => {
    const { container } = render(<Input />);

    expect(container.firstElementChild?.classList.contains('form-control-file')).toBe(false);
    expect(container.firstElementChild?.classList.contains('form-control-plaintext')).toBe(false);
    expect(container.firstElementChild?.classList.contains('form-check-input')).toBe(false);
  });

  it('should not render with "form-control" nor "form-control-plaintext" nor "form-check-input" class when type is file', () => {
    const { container } = render(<Input type="file" />);

    expect(container.firstElementChild?.classList.contains('form-control')).toBe(false);
    expect(container.firstElementChild?.classList.contains('form-control-plaintext')).toBe(false);
    expect(container.firstElementChild?.classList.contains('form-check-input')).toBe(false);
  });

  it('should not render with "form-control-file" nor "form-control" nor "form-check-input" class when plaintext prop is truthy', () => {
    const { container } = render(<Input plaintext type="file" />);

    expect(container.firstElementChild?.classList.contains('form-control-file')).toBe(false);
    expect(container.firstElementChild?.classList.contains('form-control')).toBe(false);
    expect(container.firstElementChild?.classList.contains('form-check-input')).toBe(false);
  });
  it('should not render with "form-control-file" nor "form-control-plaintext" nor "form-control" class when type is radio', () => {
    const { container } = render(<Input type="radio" />);

    expect(container.firstElementChild?.classList.contains('form-control-file')).toBe(false);
    expect(container.firstElementChild?.classList.contains('form-control-plaintext')).toBe(false);
    expect(container.firstElementChild?.classList.contains('form-control')).toBe(false);
  });

  it('should not render with "form-control-file" nor "form-control-plaintext" nor "form-control" class when type is checkbox', () => {
    const { container } = render(<Input type="checkbox" />);

    expect(container.firstElementChild?.classList.contains('form-control-file')).toBe(false);
    expect(container.firstElementChild?.classList.contains('form-control-plaintext')).toBe(false);
    expect(container.firstElementChild?.classList.contains('form-control')).toBe(false);
  });

  it('should render with "form-check-input" class when type is checkbox', () => {
    const { container } = render(<Input type="checkbox" />);

    expect(container.firstElementChild?.classList.contains('form-check-input')).toBe(true);
  });

  it('should render with "form-check-input" class when type is radio', () => {
    const { container } = render(<Input type="radio" />);

    expect(container.firstElementChild?.classList.contains('form-check-input')).toBe(true);
  });

  it('should not render with "form-check-input" nor "form-control" class when type is checkbox and addon is truthy', () => {
    const { container } = render(<Input addon type="checkbox" />);

    expect(container.firstElementChild?.classList.contains('form-check-input')).toBe(false);
    expect(container.firstElementChild?.classList.contains('form-control')).toBe(false);
  });

  it('should not render with "form-check-input" nor "form-control" class when type is radio and addon is truthy', () => {
    const { container } = render(<Input addon type="radio" />);

    expect(container.firstElementChild?.classList.contains('form-check-input')).toBe(false);
    expect(container.firstElementChild?.classList.contains('form-control')).toBe(false);
  });

  it('should render with "form-control-file" class when type is file', () => {
    const { container } = render(<Input type="file" />);

    expect(container.firstElementChild?.classList.contains('form-control-file')).toBe(true);
  });

  it('should render additional classes', () => {
    const { container } = render(<Input className="other" />);

    expect(container.firstElementChild?.classList.contains('other')).toBe(true);
  });

  it('should render "select" and "textarea" without type property', () => {
    const inputWrapper = render(<Input type="select">Yo!</Input>);
    const textareaWrapper = render(<Input type="textarea" />);
    const input = inputWrapper.container;
    const textarea = textareaWrapper.container;

    expect(input.querySelector('[type="select"]')).toBeNull();
    expect(textarea.querySelector('[type="textarea"]')).toBeNull();
  });

  it('should render with "form-control-range" not "form-control" class when type is range', () => {
    const { container } = render(<Input type="range" />);

    expect(container.firstElementChild?.classList.contains('form-control-range')).toBe(true);
    expect(container.firstElementChild?.classList.contains('form-control')).toBe(false);
  });
});
