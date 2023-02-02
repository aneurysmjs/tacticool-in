// eslint-disable @typescript-eslint/ban-ts-ignore
import { FormEvent, useCallback, useEffect, useReducer, useRef } from 'react';
import isEmpty from 'ramda/src/isEmpty';
import { FieldElement } from '~/shared/types/form';
import isRadioOrCheckBox from '~/utils/isRadioOrCheckBox';
import isFunction from '~/utils/isFunction';
import {
  SET_FIELD_VALUE,
  SET_ERROR,
  DELETE_ERROR,
  Action,
  OnSubmit,
  UseFormState,
  UseFormValidationResult,
  UseForm,
  ValidationOptions,
} from './types';

import attachEventListeners from './logic/attachEventListeners';
import detachEventListeners from './logic/detachEventListeners';

function useFormReducer<T>(state: UseFormState<T>, action: Action<T>): UseFormState<T> {
  if (action.type === SET_FIELD_VALUE) {
    return {
      ...state,
      values: {
        ...state.values,
        ...action.payload,
      },
    };
  }

  if (action.type === SET_ERROR) {
    // return {
    //   ...state,
    //   errors: {
    //     ...state.errors,
    //     ...action.payload,
    //   },
    // };

    // console.log('action.payload', action.payload);

    return {
      ...state,
      errors: {
        ...state.errors,
        ...(Object.keys(action.payload).length && action.payload),
      },
    };
  }

  if (action.type === DELETE_ERROR) {
    if (state.errors) {
      // eslint-disable-next-line no-param-reassign
      delete state.errors[action.payload];
    }

    return {
      ...state,
      errors: {
        ...state.errors,
      },
    };
  }

  return state;
}

export default function useFormValidation<T>({
  formValues: values,
}: UseForm<T>): UseFormValidationResult<T> {
  const fieldsRef = useRef<{ [K: string]: FieldElement }>({});
  const errorsRef = useRef<{ [K: string]: ValidationOptions }>({});

  const isUnMount = useRef(false);

  const [state, dispatch] = useReducer(useFormReducer, {
    values,
    errors: null,
    touched: null,
  });

  const validateField = useCallback((field: FieldElement, validationOptions: ValidationOptions) => {
    // if (isFunction(validationOptions.validate) && !validationOptions.validate(field.value)) {
    //   dispatch({
    //     type: SET_ERROR,
    //     payload: {
    //       [field.name]: {
    //         message: ' fuck',
    //       },
    //     },
    //   });
    // } else {
    //   dispatch({
    //     type: DELETE_ERROR,
    //     payload: field.name,
    //   });
    // }
    if (isFunction(validationOptions.validate)) {
      dispatch({
        type: SET_ERROR,
        payload: {
          ...(!validationOptions.validate(field.value) && {
            [field.name]: {
              message: ' fuck',
            },
          }),
        },
      });
    }
  }, []);

  const runValidation = useCallback(
    (target: FieldElement) => {
      const currentErrorRef = errorsRef.current[target.name];

      if (currentErrorRef) {
        validateField(target, currentErrorRef);
      }
    },
    [validateField],
  );

  const handleChange = useCallback(
    (evt: Event) => {
      const target = evt.target as FieldElement;

      runValidation(target);

      dispatch({
        type: SET_FIELD_VALUE,
        payload: {
          [target.name]: target.value,
        },
      });
    },
    [runValidation],
  );

  const register = useCallback(
    // eslint-disable-next-line consistent-return
    (validationOptions?: ValidationOptions) =>
      (ref: HTMLInputElement): void => {
        if (!ref?.name) {
          // eslint-disable-next-line no-console
          return console.warn('no name at @', ref);
        }

        const fields = fieldsRef.current;
        const errors = errorsRef.current;

        const { name } = ref;

        if (validationOptions && !errors[name]) {
          errors[name] = validationOptions;
        }

        // if there's a `ref` and the field doesn't exist
        if (ref && !fields[name]) {
          fields[name] = ref;

          attachEventListeners({
            field: { ref: fields[name] },
            handleChange,
            isRadioOrCheckbox: isRadioOrCheckBox(fields[name]),
          });
        }
      },
    [handleChange],
  );

  const handleSubmit =
    (onSubmit: OnSubmit) =>
    async (evt: FormEvent): Promise<void> => {
      if (evt) {
        evt.preventDefault();
        evt.persist();
      }

      try {
        await onSubmit();
      } catch (err) {
        dispatch({
          type: SET_ERROR,
          payload: {
            submitError: {
              message: (err as Error).message,
            },
          },
        });
      }
    };

  useEffect(() => {
    const fields = fieldsRef.current;
    isUnMount.current = false;

    return (): void => {
      isUnMount.current = true;

      Object.values(fields).forEach(detachEventListeners(handleChange));
    };
  }, [handleChange]);

  const formState = {
    isValid: isEmpty(errorsRef.current),
  };

  // console.log('errorsRef.current', errorsRef.current);
  // console.log('formState', formState);

  // TODO: investigate why `UseFormState<unknown>` came like that from the reducer
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return { register, handleSubmit, ...state, ...formState };
}
