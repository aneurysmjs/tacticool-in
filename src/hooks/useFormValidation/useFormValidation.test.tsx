import { renderHook, act } from '@testing-library/react';

import useFormValidation from './useFormValidation';
import attachEventListeners from './logic/attachEventListeners';

jest.mock('./logic/attachEventListeners');

describe('useFormValidation', () => {
  it('should return "values" and "handleChange"', () => {
    const { result } = renderHook(() => useFormValidation({ formValues: { a: '1' } }));

    expect(result.current.values).toEqual({ a: '1' });

    const input = document.createElement('input');
    input.name = 'testingInput';

    act(() => {
      result.current.register()(input);
    });

    console.log('Object.keys(input)', Object.keys(input));

    expect(attachEventListeners).toHaveBeenCalledWith({
      field: {
        ref: input,
      },
      handleChange: expect.any(Function),
      isRadioOrCheckbox: false,
    });
  });
});
