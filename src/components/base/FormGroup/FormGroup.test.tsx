import { render } from '@testing-library/react';

import FormGroup from './FormGroup';

describe('FormGroup', () => {
  it('should render with "form" tag by default', () => {
    const { getByText } = render(<FormGroup>Yo!</FormGroup>);
    const formGroup = getByText('Yo!');

    expect(formGroup.tagName).toBe('DIV');
  });

  it('should render children', () => {
    const { getByText } = render(<FormGroup>Yo!</FormGroup>);
    const formGroup = getByText('Yo!');

    expect(formGroup.textContent).toBe('Yo!');
  });

  it('should render with "form-group" class by default', () => {
    const { getByText } = render(<FormGroup>Yo!</FormGroup>);
    const formGroup = getByText('Yo!');

    expect(formGroup.classList.contains('form-group')).toBe(true);
  });

  it('should not render with "form-check" nor "form-check-inline"  class by default', () => {
    const { getByText } = render(<FormGroup>Yo!</FormGroup>);
    const formGroup = getByText('Yo!');

    expect(formGroup.classList.contains('form-check')).toBe(false);
    expect(formGroup.classList.contains('form-check-inline')).toBe(false);
  });

  it('should render with "form-check" class when check prop is truthy', () => {
    const { getByText } = render(<FormGroup check>Yo!</FormGroup>);
    const formGroup = getByText('Yo!');

    expect(formGroup.classList.contains('form-check')).toBe(true);
  });

  it('should not render with "form-check-inline" class when check prop is truthy and inline prop is falsy', () => {
    const { getByText } = render(<FormGroup check>Yo!</FormGroup>);
    const formGroup = getByText('Yo!');

    expect(formGroup.classList.contains('form-check-inline')).toBe(false);
  });

  it('should render with "form-check" and "form-check-inline" classes when check prop and inline prop are both truthy', () => {
    const { getByText } = render(
      <FormGroup check inline>
        Yo!
      </FormGroup>,
    );

    const formGroup = getByText('Yo!');

    expect(formGroup.classList.contains('form-check')).toBe(true);
    expect(formGroup.classList.contains('form-check-inline')).toBe(true);
  });

  it('should not render with "form-check-inline" class when check prop is falsy and inline prop is truthy', () => {
    const { getByText } = render(<FormGroup inline>Yo!</FormGroup>);
    const formGroup = getByText('Yo!');

    expect(formGroup.classList.contains('form-check-inline')).toBe(false);
  });

  it('should not render with "form-group" class when check prop is truthy', () => {
    const { getByText } = render(<FormGroup check>Yo!</FormGroup>);
    const formGroup = getByText('Yo!');

    expect(formGroup.classList.contains('form-group')).toBe(false);
  });

  it('should not render with "disabled" class when disabled prop is truthy but check is not', () => {
    const { getByText } = render(<FormGroup disabled>Yo!</FormGroup>);
    const formGroup = getByText('Yo!');

    expect(formGroup.classList.contains('disabled')).toBe(false);
  });

  it('should render with "disabled" class when both check disabled props are truthy', () => {
    const { getByText } = render(
      <FormGroup check disabled>
        Yo!
      </FormGroup>,
    );
    const formGroup = getByText('Yo!');

    expect(formGroup.classList.contains('disabled')).toBe(true);
    expect(formGroup.classList.contains('form-check')).toBe(true);
  });

  it('should render with "row" class when row prop is truthy', () => {
    const { getByText } = render(<FormGroup row>Yo!</FormGroup>);
    const formGroup = getByText('Yo!');

    expect(formGroup.classList.contains('row')).toBe(true);
  });

  it('should not render with "row" class when row prop is not truthy', () => {
    const { getByText } = render(<FormGroup>Yo!</FormGroup>);
    const formGroup = getByText('Yo!');

    expect(formGroup.classList.contains('row')).toBe(false);
  });

  it('should render additional classes', () => {
    const { getByText } = render(<FormGroup className="other">Yo!</FormGroup>);
    const formGroup = getByText('Yo!');

    expect(formGroup.classList.contains('other')).toBe(true);
  });

  it('should render custom tag', () => {
    const { getByText } = render(<FormGroup tag="main">Yo!</FormGroup>);
    const formGroup = getByText('Yo!');

    expect(formGroup.tagName).toBe('MAIN');
  });
});
