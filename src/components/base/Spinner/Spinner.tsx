import React from 'react';

import './Spinner.scss';

type PropsType = {
  height: number | string;
  width: number | string;
};

const Spinner = ({ height, width }: PropsType): JSX.Element => (
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

Spinner.defaultProps = {
  height: '24',
  width: '24',
};

export default Spinner;
