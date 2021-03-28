import React, { ReactNode, ReactType, ReactElement, HTMLProps } from 'react';

import classNames from 'classnames';

interface PropsType extends HTMLProps<HTMLDivElement> {
  [key: string]: unknown;
  children?: ReactNode;
  row?: boolean;
  check?: boolean;
  inline?: boolean;
  disabled?: boolean;
  tag?: string | ReactType;
  className?: string;
}

function FormGroup({
  className,
  row,
  disabled,
  check,
  inline,
  tag: Tag = 'div',
  ...attributes
}: PropsType): ReactElement {
  const classes = classNames(
    className,
    row ? 'row' : false,
    check ? 'form-check' : 'form-group',
    check && inline ? 'form-check-inline' : false,
    check && disabled ? 'disabled' : false,
  );

  if (Tag === 'fieldset') {
    // eslint-disable-next-line no-param-reassign
    attributes.disabled = disabled;
  }

  return <Tag {...attributes} className={classes} />;
}

export default FormGroup;
