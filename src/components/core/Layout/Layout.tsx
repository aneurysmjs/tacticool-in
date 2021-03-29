import React, { FunctionComponent, ReactNode } from 'react';

import Footer from '~/components/core/Footer';
import Header from '~/components/core/Header';
import './Layout.scss';

type PropsType = {
  children: ReactNode;
};

const Layout: FunctionComponent<PropsType> = ({ children }: PropsType): JSX.Element => (
  <div className="layout">
    <Header />
    <div className="layout__content">{children}</div>
    <Footer />
  </div>
);

export default Layout;
