import { useState, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import UserMenu from '~/components/core/UserMenu';
import { NavLinks } from '~/shared/types';
import './Navigation.css';

type ClassNameProp = { isActive: boolean };

const links: NavLinks = [
  {
    id: 0,
    name: 'Home',
    path: '/',
  },
  {
    id: 1,
    name: 'Mods',
    path: '/mods',
  },
  {
    id: 2,
    name: 'Zombie',
    path: '/zombie',
  },
  {
    id: 3,
    name: 'Testing',
    path: '/testing',
  },
];

const navbarLinkClass = 'navigation__link';

const navLinks = links.length
  ? links.map(({ path, name, id }) => (
      <NavLink
        key={id}
        className={({ isActive }: ClassNameProp): string =>
          isActive ? `${navbarLinkClass} navigation__link--active` : navbarLinkClass
        }
        role="menuitem"
        to={path}
      >
        {name}
      </NavLink>
    ))
  : null;

function Navigation(): ReactElement {
  const [isMobileMenuOpen, setMobileMenu] = useState(false);
  return (
    <nav className="navigation">
      <div className="navigation__container">
        <div className="navigation__content">
          <div className="navigation__mobile-menu">
            <button
              aria-controls="mobile-menu"
              aria-expanded="false"
              className="navigation__mobile-menu-button"
              type="button"
              onClick={(): void => setMobileMenu(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>

              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <div className="navigation__desktop-nav">
            <div className="navigation__desktop-nav-title">Tacticool.in</div>
            <div className="navigation__desktop-nav-container">
              <div className="navigation__desktop-nav-wrapper">{navLinks}</div>
            </div>
          </div>
          <UserMenu />
        </div>
      </div>

      <div className="navigation__mobile-nav" id="mobile-menu">
        <div className="navigation__mobile-nav-wrapper">
          {links.length
            ? links.map(({ path, name, id }) => (
                <NavLink
                  key={id}
                  className={({ isActive }: ClassNameProp): string =>
                    isActive ? `${navbarLinkClass} navigation__link--active` : navbarLinkClass
                  }
                  role="menuitem"
                  to={path}
                >
                  {name}
                </NavLink>
              ))
            : null}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
