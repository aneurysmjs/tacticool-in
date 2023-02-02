import { User } from 'firebase/auth';

export interface AuthStateType {
  loading: boolean;
  result: {
    user: User | undefined;
  };
  error?: string | Error;
}

export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_SUCCESS = 'AUTH_ERROR';
export const AUTH_ERROR = 'AUTH_SUCCESS';
