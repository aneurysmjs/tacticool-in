/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useReducer, Reducer, ReducerState, ReducerAction, Dispatch } from 'react';

import { BaseAction } from '~/shared/types';

type ThunkAction<ReturnType, State, BasicAction extends BaseAction> = (
  dispatch: ThunkDispatch<State, BasicAction>,
) => ReturnType;

export interface ThunkDispatch<State, BasicAction extends BaseAction> {
  /**
   * thunk
   */
  <ReturnType>(thunkAction: ThunkAction<ReturnType, State, BasicAction>): ReturnType;
  /**
   * regular action
   */
  <A extends BasicAction>(action: A): A;
  /**
   * This overload is the union of the two above (see TS issue #14107).
   */
  <ReturnType, TAction extends BasicAction>(
    action: TAction | ThunkAction<ReturnType, State, BasicAction>,
  ): TAction | ReturnType;
}

// overload for free "I"; all goes as long as initializer converts it into "ReducerState<R>".
export default function useThunkReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initialState: I & ReducerState<R>,
  init?: undefined,
  // ): [ReducerState<R>, ThunkDispatch<I & ReducerState<R>, ReducerAction<R>>] {
): [ReducerState<R>, Dispatch<ReducerAction<R>>] {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  /**
   * We use `useCallback` to preserve enhancedDispatch's identity on every render
   */
  const enhancedDispatch = useCallback(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (action) => {
      if (typeof action === 'function') {
        action(dispatch);
      }

      dispatch(action);
    },
    [dispatch],
  );

  return [state, enhancedDispatch];
}
