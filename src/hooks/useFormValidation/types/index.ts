/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent } from 'react';

export const SET_FIELD_VALUE = 'SET_FIELD_VALUE';
export const SET_ERROR = 'SET_ERROR';
export const DELETE_ERROR = 'DELETE_ERROR';

export interface Register {
  (validationOptions?: ValidationOptions): (ref: HTMLInputElement) => void;
}

export interface OnSubmit {
  (): void | Promise<void>;
}

/**
 * j
 */
export interface UseFormState<T> {
  values: {
    [K in keyof T]: T[K];
  };
  touched: TouchedType<T> | null;
  errors: Errors | null;
}

export interface FormState {
  isValid: boolean;
}

export interface UseForm<T> {
  formValues: FormValues<T>;
}

export interface UseFormValidationResult<T> extends UseFormState<T>, FormState {
  // handleChange(evt: ChangeEvent<HTMLInputElement>): void;
  handleSubmit(onSubmit: OnSubmit): (evt: FormEvent) => void;
  register: Register;
}

export interface ErrorType {
  name?: string;
  type?: string;
  message?: string;
}

export interface Errors {
  [K: string]: ErrorType;
}

export type FormValues<T> = {
  [K in keyof T]: T[K];
};

export type TouchedType<T> = {
  [K in keyof T]: boolean;
};

export type Message = string | React.ReactElement;

export type ValidateResult = Message | boolean | undefined;

export type Validate = (data: any) => ValidateResult | Promise<ValidateResult>;

export type ValidationValue = boolean | number | string | RegExp;

export type ValidationOption<TValidationValue extends ValidationValue = ValidationValue> =
  | TValidationValue
  | ValidationValueMessage<TValidationValue>;

export type ValidationValueMessage<TValidationValue extends ValidationValue = ValidationValue> = {
  value: TValidationValue;
  message: Message;
};
/**
 * Rules to apply validations
 */
export interface ValidationOptions {
  validate: Validate | Record<string, Validate>;
}

export type ValidationMode = {
  onBlur: 'onBlur';
  onChange: 'onChange';
  onSubmit: 'onSubmit';
};

/**
 * Every action for every step.
 */
export type Action<T> =
  | {
      readonly type: typeof SET_FIELD_VALUE;
      payload: T;
    }
  | {
      readonly type: typeof SET_ERROR;
      payload: Errors;
    }
  | {
      readonly type: typeof DELETE_ERROR;
      payload: string;
    };
