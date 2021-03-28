import isNil from 'ramda/src/isNil';

import isArray from './isArray';

export const isObjectType = (value: unknown): boolean => typeof value === 'object';

export default <T extends object>(value: unknown): value is T =>
  !isNil(value) && !isArray(value) && isObjectType(value);
