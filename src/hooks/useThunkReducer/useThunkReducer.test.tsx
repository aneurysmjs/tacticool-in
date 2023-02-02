/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Dispatch } from 'react';
import { renderHook, act } from '@testing-library/react';

import { Action } from '~/shared/types';

import useThunkReducer from './useThunkReducer';

interface ThunkState {
  loading: boolean;
  result: {
    name: string;
  };
  error?: string | Error;
}

const initState: ThunkState = {
  loading: false,
  result: {
    name: 'Джеро',
  },
};

const reducer = (state: ThunkState, action: Action): ThunkState => {
  if (action.type === 'LOADING') {
    return {
      ...state,
      loading: true,
    };
  }

  if (action.type === 'SUCCESS') {
    return {
      ...state,
      loading: false,
      result: {
        name: action.payload,
      },
    };
  }

  if (action.type === 'ERROR') {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }

  return state;
};

describe('useThunkReducer tests', () => {
  it('should handle normal dispatch actions', () => {
    const dummyReducer = (state: number, action: Action): number =>
      action.type === 'inc' ? state + 1 : state;

    const { result } = renderHook(() => useThunkReducer(dummyReducer, 0));

    const [initialState, dispatch] = result.current;

    expect(initialState).toBe(0);

    act(() => dispatch({ type: 'inc' }));

    const [state] = result.current;

    expect(state).toBe(1);
  });

  it('should handle thunk action', async () => {
    const thunkAction = async (dispatch: Dispatch<Action<string>>): Promise<void> => {
      dispatch({ type: 'LOADING' });
      try {
        const payload = await Promise.resolve('Matthias');
        dispatch({ type: 'SUCCESS', payload });
      } catch (error) {
        // @ts-ignore
        dispatch({ type: 'ERROR', error });
      }
    };

    const expectedState: ThunkState = {
      loading: false,
      result: {
        name: 'Matthias',
      },
    };

    const { result } = renderHook(() => useThunkReducer(reducer, initState));

    const [initialState, dispatch] = result.current;

    expect(initialState).toBe(initState);

    // @ts-ignore TODO: add function overload Dispatch's `thunk` action
    await act(async () => dispatch(thunkAction));

    const [state] = result.current;

    expect(state).toStrictEqual(expectedState);
  });

  it('should handle error from thunk action', async () => {
    const thunkAction = async (dispatch: Dispatch<Action<string>>): Promise<void> => {
      dispatch({ type: 'LOADING' });
      try {
        const payload = await Promise.reject(new Error('something wrong happened'));
        dispatch({ type: 'SUCCESS', payload });
      } catch (error) {
        // @ts-ignore
        dispatch({ type: 'ERROR', error });
      }
    };

    const expectedState: ThunkState = {
      loading: false,
      result: {
        name: 'Джеро',
      },
      error: new Error('something wrong happened'),
    };

    const { result } = renderHook(() => useThunkReducer(reducer, initState));

    const [initialState, dispatch] = result.current;

    expect(initialState).toBe(initState);

    // @ts-ignore TODO: add function overload Dispatch's `thunk` action
    await act(async () => dispatch(thunkAction));

    const [state] = result.current;

    expect(state).toStrictEqual(expectedState);
  });
});
