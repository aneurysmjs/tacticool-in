/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { ComponentType, ReactElement } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';

import loadable from '@loadable/component';
import Layout from '~/components/core/Layout';

import { Home } from '~/components/pages/Home';
import { useAuth } from '~/providers/AuthProvider';
import './Routing.scss';

const Auth = loadable(() => import('~/components/pages/Auth/Auth'));

const Routing = (): ReactElement => {
  const [state] = useAuth();

  return (
    <main className="routing">
      <Layout>
        <Route exact component={Home} path="/" />
        <Route exact component={Auth} path="/auth" />

        {/* <PrivateRoute authed={user !== null} component={Admin} path="/admin" /> */}
      </Layout>
    </main>
  );
};

export default Routing;
