import { FunctionComponent, useContext } from 'react';

import { OperatorsContext } from '~/providers/OperatorsProvider';

const OperatorsList: FunctionComponent = () => {
  const ops = useContext(OperatorsContext);
  // eslint-disable-next-line no-console
  console.log('ops', ops);
  return <div>OperatorsList</div>;
};

export default OperatorsList;
