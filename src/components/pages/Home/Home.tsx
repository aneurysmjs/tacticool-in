import { FunctionComponent } from 'react';

import Spinner from '~/components/base/Spinner';

import OperatorsProvider from '~/providers/OperatorsProvider';
import OperatorsList from '~/components/pages/Home/components/OperatorsList';

import './Home.css';

const Home: FunctionComponent = () => {
  return (
    <OperatorsProvider path="operators">
      <div className="home">
        <h2 className="home__title">Shop</h2>
        <div className="row">
          <span className="home__loader">
            <Spinner />
          </span>

          <OperatorsList />
        </div>
      </div>
    </OperatorsProvider>
  );
};

export default Home;
