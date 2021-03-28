import React, { useState, useEffect, FunctionComponent } from 'react';

import './Icon.scss';

type PropsType = {
  path: string;
  selected?: string;
  size?: number | string;
};

const Icon: FunctionComponent<PropsType> = ({ path, size = 16 }: PropsType) => {
  const [iconPath, setIconPath] = useState('');

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        // eslint-disable-next-line prettier/prettier
        const icon = await import(/* webpackChunkName: "ShopIcon" */ '~/assets/svg/' + path + '.svg'); // eslint-disable-line prefer-template
        setIconPath(icon.default);
        // eslint-disable-next-line no-empty
      } catch (err) {}
    })();
  }, [path]);

  return (
    <img
      alt={`icon ${path}`}
      className="icon"
      src={iconPath}
      style={{
        height: `${size}px`,
        width: `${size}px`,
      }}
    />
  );
};

export default Icon;
