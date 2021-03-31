import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

import './UserDropdown.scss';

const links = [
  {
    id: 0,
    name: 'Your Profile',
    path: '/profile',
  },
  {
    id: 1,
    name: 'Settings',
    path: '/settings',
  },
  {
    id: 2,
    name: 'Sign out',
    path: '/signout',
  },
];

const UserDropdown: FunctionComponent = () => {
  return (
    <div className="user-dropdown">
      <div>
        <button
          aria-expanded="false"
          aria-haspopup="true"
          className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          id="user-dropdown"
          type="button"
        >
          <span className="sr-only">Open user menu</span>
          <img
            alt=""
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
        </button>
      </div>

      {/* <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}
      <ul
        aria-labelledby="user-dropdown"
        aria-orientation="vertical"
        className="user-dropdown__drop-down"
        role="menu"
      >
        {links.length
          ? links.map(({ path, name, id }) => (
              <NavLink
                key={id}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                to={`/${path}`}
              >
                {name}
              </NavLink>
            ))
          : null}
      </ul>
    </div>
  );
};

export default UserDropdown;
