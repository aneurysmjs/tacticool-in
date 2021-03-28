import React, { FunctionComponent, ReactNode } from 'react';

import Footer from '~/components/core/Footer';
import Header from '~/components/core/Header';

type PropsType = {
  children: ReactNode;
};

const Layout: FunctionComponent<PropsType> = ({ children }: PropsType): JSX.Element => (
  <div className="d-flex flex-column vh-100">
    <Header />
    <div className="flex-grow-1 container-fluid">{children}</div>
    <Footer />
  </div>
);

export default Layout;
