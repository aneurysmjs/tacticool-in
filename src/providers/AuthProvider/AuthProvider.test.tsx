import React, { createContext, useContext, ReactNode, ReactElement } from 'react';
import { renderHook, act, RenderHookResult } from '@testing-library/react-hooks';

import { auth } from '~/firebase-config';

import { AuthProvider, useAuth, AuthDispatch } from './AuthProvider';
import { AuthStateType } from './types';
import { authState } from './authReducer';

interface WrapperProps {
  children?: ReactNode;
}

describe('AuthProvider', () => {
  describe('useAuth hook', () => {
    test('should get value from context provider', async () => {
      jest.spyOn(auth, 'onAuthStateChanged');

      let testRenderer = {} as RenderHookResult<{}, [AuthStateType, AuthDispatch]>;

      const wrapper = ({ children }: WrapperProps): ReactElement => (
        <AuthProvider>{children}</AuthProvider>
      );

      expect(auth.onAuthStateChanged).not.toHaveBeenCalled();

      await act(async () => {
        testRenderer = renderHook(() => useAuth(), {
          wrapper,
        });
      });

      const [state] = testRenderer.result.current;

      expect(auth.onAuthStateChanged).toHaveBeenCalled();
      expect(state).toStrictEqual(authState);

      auth.onAuthStateChanged.mockRestore();
    });

    it('throws an error if it is not in context', () => {
      const { result } = renderHook(() => useAuth());

      expect(result.error).toBeDefined();
    });
  });
});
