import { InputHTMLAttributes, ReactElement, Ref } from 'react';
import classNames from 'classnames';

export type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'datetime'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'select'
  | 'submit'
  | 'tel'
  | 'text'
  | 'textarea'
  | 'time'
  | 'url'
  | 'week';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  [key: string]: unknown;
  type?: InputType;
  bsSize?: 'lg' | 'sm';
  state?: string;
  valid?: boolean;
  invalid?: boolean;
  tag?: string;
  innerRef?: Ref<HTMLInputElement> | HTMLInputElement;
  plaintext?: boolean;
  addon?: boolean;
  className?: string;
}

const isNotaNumber = /\D/g;

function Input({
  className,
  type = 'text',
  bsSize,
  valid,
  invalid,
  tag,
  addon,
  plaintext,
  innerRef,
  ...attributes
}: InputProps): ReactElement {
  // const getRef = ref => {
  //   if (this.props.innerRef) {
  //     this.props.innerRef(ref);
  //   }
  //   this.ref = ref;
  // };

  // const focus = (): void => {
  //   if (this.ref) {
  //     this.ref.focus();
  //   }
  // };

  const checkInput = ['radio', 'checkbox'].indexOf(type) > -1;

  const fileInput = type === 'file';
  const textareaInput = type === 'textarea';
  const selectInput = type === 'select';
  const rangeInput = type === 'range';

  let Tag = tag || (selectInput || textareaInput ? type : 'input');

  let formControlClass: string | null = 'form-control';

  if (plaintext) {
    formControlClass = `${formControlClass}-plaintext`;
    Tag = tag || 'input';
  } else if (fileInput) {
    formControlClass = `${formControlClass}-file`;
  } else if (rangeInput) {
    formControlClass = `${formControlClass}-range`;
  } else if (checkInput) {
    if (addon) {
      formControlClass = null;
    } else {
      formControlClass = 'form-check-input';
    }
  }

  if (attributes.size && isNotaNumber.test(String(attributes.size))) {
    // eslint-disable-next-line no-console
    console.warn(
      'Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.',
    );
    // eslint-disable-next-line no-param-reassign, @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    bsSize = attributes.size;
    // eslint-disable-next-line no-param-reassign
    delete attributes.size;
  }

  const classes = classNames(
    className,
    invalid && 'is-invalid',
    valid && 'is-valid',
    bsSize ? `form-control-${bsSize}` : false,
    formControlClass,
  );

  if (Tag === 'input' || (tag && typeof tag === 'function')) {
    // eslint-disable-next-line no-param-reassign
    attributes.type = type;
  }

  if (
    attributes.children &&
    !(plaintext || type === 'select' || typeof Tag !== 'string' || Tag === 'select')
  ) {
    // eslint-disable-next-line no-console
    console.warn(
      `Input with a type of "${type}" cannot have children. Please use "value"/"defaultValue" instead.`,
    );
    // eslint-disable-next-line no-param-reassign
    delete attributes.children;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Tag {...attributes} ref={innerRef} className={classes} />;
}

export default Input;
