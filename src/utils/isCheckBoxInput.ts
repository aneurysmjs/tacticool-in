import { FieldElement } from '~/shared/types/form';

export default (element: FieldElement): element is HTMLInputElement => element.type === 'checkbox';
