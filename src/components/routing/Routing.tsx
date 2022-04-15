import { FunctionComponent, lazy } from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import Layout from '~/components/core/Layout';

import { Home } from '~/components/pages/Home';
import { useAuth } from '~/providers/AuthProvider';

const Auth = lazy(() => import('~/components/pages/Auth/Auth'));

const Routing: FunctionComponent = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state] = useAuth();

  return (
    <Router>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route index element={<Home />} />

          <Route element={<Auth />} path="/auth" />

          {/* <PrivateRoute authed={user !== null} component={Admin} path="/admin" /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default Routing;
