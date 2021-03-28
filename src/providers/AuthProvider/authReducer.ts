import firebase from 'firebase';

import { Action } from '~/shared/types';

import { AuthStateType, AUTH_LOADING, AUTH_SUCCESS, AUTH_ERROR } from './types';

export const authState: AuthStateType = {
  loading: false,
  result: {
    user: undefined,
  },
  error: undefined,
};

export function authReducer(state: AuthStateType, action: Action<firebase.User>): AuthStateType {
  if (action.type === AUTH_LOADING) {
    return {
      ...state,
      loading: true,
    };
  }

  if (action.type === AUTH_SUCCESS) {
    return {
      ...state,
      loading: false,
      result: {
        user: action.payload,
      },
    };
  }

  if (action.type === AUTH_ERROR) {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }

  return state;
}
