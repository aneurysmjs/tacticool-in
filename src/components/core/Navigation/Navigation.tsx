import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.scss';

type Links = Array<{
  id: string;
  path: string;
  name: string;
}>;

const links: Links = [];

function Navigation(): ReactElement {
  return (
    <nav className="navigation">
      <NavLink className="navbar-brand" to="/">
        Shop
      </NavLink>
      <button className="navbar-toggler navbar-toggler-right" type="button">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {links.length
            ? links.map(({ path, name, id }) => (
                <li key={id} className="nav-item">
                  <NavLink key={id} activeClassName="active" className="nav-link" to={`/${path}`}>
                    {name}
                  </NavLink>
                </li>
              ))
            : null}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
