import React, { FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import UserDropdown from '~/components/core/UserDropdown';

import './UserMenu.scss';

const UserMenu: FunctionComponent = () => {
  return (
    <div className="user-menu">
      <button className="user-menu__button">
        <span className="sr-only">View notifications</span>
        <FontAwesomeIcon icon={faBell} />
      </button>

      <UserDropdown />
    </div>
  );
};

export default UserMenu;
