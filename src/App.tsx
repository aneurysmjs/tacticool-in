import { FunctionComponent } from 'react';

import Routing from '~/components/routing';
import { AuthProvider } from '~/providers/AuthProvider';

import './assets/scss/styles.scss';

const App: FunctionComponent = () => (
  <AuthProvider>
    <Routing />
  </AuthProvider>
);

export default App;
