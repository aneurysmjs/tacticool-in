import { FieldElement } from '~/shared/types/form';

import isRadioInput from './isRadioInput';
import isCheckBoxInput from './isCheckBoxInput';

export default (ref: FieldElement): ref is HTMLInputElement =>
  isRadioInput(ref) || isCheckBoxInput(ref);
