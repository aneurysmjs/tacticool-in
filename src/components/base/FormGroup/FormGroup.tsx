import { ReactNode, HTMLProps, FunctionComponent } from 'react';

import classNames from 'classnames';

interface PropsType extends HTMLProps<HTMLDivElement> {
  [key: string]: unknown;
  children?: ReactNode;
  row?: boolean;
  check?: boolean;
  inline?: boolean;
  disabled?: boolean;
  tag?: string;
  className?: string;
}

const FormGroup: FunctionComponent<PropsType> = ({
  className,
  row,
  disabled,
  check,
  inline,
  tag: Tag = 'div',
  ...attributes
}) => {
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Tag {...attributes} className={classes} />;
};

export default FormGroup;
