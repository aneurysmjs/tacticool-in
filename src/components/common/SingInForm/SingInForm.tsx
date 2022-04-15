import { ReactElement, Dispatch, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';

import { Action } from '~/shared/types';
import { auth } from '~/firebase-config';
import { AUTH_LOADING, AUTH_SUCCESS, AUTH_ERROR } from '~/providers/AuthProvider/types';
import { EMAIL_REGEX } from '~/constants/regexes';
import { useAuth } from '~/providers/AuthProvider';
import Button from '~/components/base/Button';
import FormGroup from '~/components/base/FormGroup';
import Input from '~/components/base/Input';
import useFormValidation from '~/hooks/useFormValidation';

import './SingInForm.css';

interface User {
  email: string;
  password: string;
}

const formValues = {
  email: '',
  password: '',
};

function SingInForm(): ReactElement {
  const [authState, dispatch] = useAuth();
  const history = useHistory();

  const { values, handleSubmit, register, errors, isValid } = useFormValidation<User>({
    formValues,
  });

  const submit = useCallback(
    async (dis: Dispatch<Action<firebase.auth.UserCredential>>): Promise<void> => {
      dis({ type: AUTH_LOADING });
      try {
        const payload = await auth.signInWithEmailAndPassword(values.email, values.password);

        dis({ type: AUTH_SUCCESS, payload });
        history.push('/admin');
      } catch (error) {
        dis({ type: AUTH_ERROR, error });
      }
    },
    [history, values.email, values.password],
  );

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore TODO: add function overload Dispatch's `thunk` action
    <form className="signIn-form" onSubmit={handleSubmit(() => dispatch(submit))}>
      <FormGroup>
        <Input
          aria-describedby="emailInput"
          autoComplete="off"
          id="email"
          innerRef={register({
            validate: (email: string): boolean => EMAIL_REGEX.test(email),
          })}
          name="email"
          placeholder="Email address"
          type="email"
        />
        <div
          role="alert"
          style={{
            transition: 'max-height .3s',
            maxHeight: `${errors?.email ? '100%' : '0'}`,
            overflow: 'hidden',
          }}
        >
          <div className="alert alert-danger mt-3 mb-0 py-1">Type a valid email</div>
        </div>
      </FormGroup>
      <FormGroup>
        <Input
          id="password"
          innerRef={register()}
          name="password"
          placeholder="Password"
          type="password"
        />
        {authState.error && (
          <div className="alert alert-danger mt-3" role="alert">
            {authState.error.message}
          </div>
        )}
      </FormGroup>

      <FormGroup>
        <Button className="p-0" color="link" type="button">
          <small>
            <u>Forgot Password?</u>
          </small>
        </Button>
      </FormGroup>
      <Button block color="primary" disabled={isValid}>
        Sign In
      </Button>
      <Button block outline className="no-hover" type="button">
        Sign Up
      </Button>
      {process.env.NODE_ENV === 'development' ? (
        <Button
          block
          outline
          className="no-hover"
          type="button"
          onClick={(): void => {
            auth.signOut();
          }}
        >
          Logout
        </Button>
      ) : null}
      <pre>{JSON.stringify(errors, null, 2)}</pre>
    </form>
  );
}

export default SingInForm;
