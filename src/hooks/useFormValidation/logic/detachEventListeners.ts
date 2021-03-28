import { EVENTS } from '../constants';

import { FieldElement } from '~/shared/types/form';

import isHTMLElement from '~/utils/isHTMLElement';

export default (handleChange: EventListenerOrEventListenerObject) => (ref: FieldElement): void => {
  if (isHTMLElement(ref) && ref.removeEventListener) {
    ref.removeEventListener(EVENTS.INPUT, handleChange);
    ref.removeEventListener(EVENTS.CHANGE, handleChange);
    ref.removeEventListener(EVENTS.BLUR, handleChange);
  }
};
