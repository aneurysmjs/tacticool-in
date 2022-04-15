import { FunctionComponent } from 'react';

import './Spinner.css';

type PropsType = {
  height?: number | string;
  width?: number | string;
};

const Spinner: FunctionComponent<PropsType> = ({ height = '24', width = '24' }) => (
  <div
    className="spinner"
    style={{
      height: `${height}px`,
      width: `${width}px`,
    }}
  >
    <div className="spinner__outer-circle" />
    <div className="spinner__inner-circle" />
  </div>
);

export default Spinner;
