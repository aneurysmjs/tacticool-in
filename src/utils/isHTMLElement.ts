import isObject from './isObject';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (value: any): value is HTMLElement =>
  isObject(value) && (value as HTMLElement).nodeType === Node.ELEMENT_NODE;
