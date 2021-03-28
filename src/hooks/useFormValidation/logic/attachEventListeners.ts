import { EVENTS } from '../constants';

import isHTMLElement from '~/utils/isHTMLElement';

import { FieldElement } from '~/shared/types/form';

export default function attachEventListeners({
  field: { ref },
  handleChange,
  isRadioOrCheckbox,
}: {
  field: { ref: FieldElement };
  isRadioOrCheckbox: boolean;
  handleChange?: EventListenerOrEventListenerObject;
}): void {
  if (isHTMLElement(ref) && handleChange) {
    ref.addEventListener(isRadioOrCheckbox ? EVENTS.CHANGE : EVENTS.INPUT, handleChange);
    ref.addEventListener(EVENTS.BLUR, handleChange);
  }
}
