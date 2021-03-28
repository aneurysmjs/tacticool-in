/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  FunctionComponent,
  ButtonHTMLAttributes,
  MouseEventHandler,
  Ref,
  CSSProperties,
  ReactType,
} from 'react';
import classNames from 'classnames';

export interface PropsType extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  [key: string]: any;
  active?: boolean;
  block?: boolean;
  close?: boolean;
  color?: string;
  disabled?: boolean;
  id?: string;
  innerRef?: Ref<HTMLButtonElement | HTMLAnchorElement>;
  onClick?: MouseEventHandler<any>;
  outline?: boolean;
  size?: string;
  style?: CSSProperties;
  tag?: string | ReactType;
}

const Button: FunctionComponent<PropsType> = ({
  'aria-label': ariaLabel,
  active,
  block,
  className,
  close,
  color = 'secondary',
  disabled,
  innerRef,
  onClick,
  outline,
  size,
  tag: Tag = 'button',
  ...attributes
}: PropsType) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (evt): void => {
    if (disabled) {
      evt.preventDefault();
      return;
    }

    if (onClick) {
      onClick(evt);
    }
  };

  if (close && typeof attributes.children === 'undefined') {
    // eslint-disable-next-line no-param-reassign
    attributes.children = <span aria-hidden>×</span>;
  }

  const btnOutlineColor = `btn${outline ? '-outline' : ''}-${color}`;

  const classes = classNames(
    className,
    { close },
    close || 'btn',
    close || btnOutlineColor,
    size ? `btn-${size}` : false,
    block ? 'btn-block' : false,
    { active, disabled },
  );

  if (attributes.href && Tag === 'button') {
    // eslint-disable-next-line no-param-reassign
    Tag = 'a';
  }

  const defaultAriaLabel = close ? 'Close' : null;

  return (
    <Tag
      type={Tag === 'button' && onClick ? 'button' : undefined}
      {...attributes}
      ref={innerRef}
      aria-label={ariaLabel || defaultAriaLabel}
      className={classes}
      onClick={handleClick}
    />
  );
};

export default Button;
