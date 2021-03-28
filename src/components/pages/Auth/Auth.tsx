import React, { FunctionComponent } from 'react';

import { SingInForm } from '~/components/common/SingInForm';

import './Auth.scss';

const Auth: FunctionComponent = () => {
  return (
    <div className="auth">
      <SingInForm />
    </div>
  );
};

export default Auth;
