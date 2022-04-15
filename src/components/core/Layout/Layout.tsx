import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '~/components/core/Footer';
import Header from '~/components/core/Header';

import './Layout.css';

const Layout: FunctionComponent = () => (
  <main className="layout">
    <Header />
    <div className="layout__content">
      <Outlet />
    </div>
    <Footer />
  </main>
);

export default Layout;
