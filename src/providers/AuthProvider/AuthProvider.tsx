import React, {
  useEffect,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
  ReactElement,
} from 'react';

import firebase from 'firebase';

import { auth } from '~/firebase-config';
import useThunkReducer from '~/hooks/useThunkReducer';

import { Action } from '~/shared/types';

import { AuthStateType, AUTH_SUCCESS } from './types';

import { authReducer, authState } from './authReducer';

type AuthUser = firebase.User;

interface PropTypes {
  children: ReactNode;
}

export type AuthDispatch = Dispatch<Action<AuthUser>>;

const AuthStateContext = createContext<AuthStateType | undefined>(undefined);
const AuthDispatchContext = createContext<AuthDispatch | undefined>(undefined);

function useAuthState(): AuthStateType {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  return context;
}

function useAuthDispatch(): AuthDispatch {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }
  return context;
}

export const useAuth = (): [
  ReturnType<typeof useAuthState>,
  ReturnType<typeof useAuthDispatch>,
] => [useAuthState(), useAuthDispatch()];

export function AuthProvider({ children }: PropTypes): ReactElement {
  const [state, dispatch] = useThunkReducer(authReducer, authState);

  useEffect(
    () =>
      auth.onAuthStateChanged(async (userAuth: firebase.User | null) => {
        if (userAuth) {
          dispatch({ type: AUTH_SUCCESS, payload: userAuth });
        } else {
          dispatch({ type: AUTH_SUCCESS, payload: undefined });
        }
      }),
    [dispatch],
  );

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}
