import React, { useState, FunctionComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import Icon from '~/components/base/Icon';
import useLazy from '~/hooks/useLazy';
import { useAuth } from '~/providers/AuthProvider';

import './UserMenu.scss';

const UserMenu: FunctionComponent = () => {
  const [state] = useAuth();

  const [open, setOpen] = useState(false);

  const handleOpen = (): void => setOpen(!open);

  const Sidebar = useLazy(
    () => import(/* webpackChunkName: "Sidebar" */ '~/components/common/Sidebar'),
    open,
  );

  return (
    <div className="user-menu">
      {Sidebar ? (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Sidebar isOpen={open} side="right" title="Cart" onClose={handleOpen}>
          <p className="lead">You have nothing, let&apos;s shop!</p>
        </Sidebar>
      ) : null}
      <span
        className="user-menu__cart-icon"
        data-testid="cartIcon"
        role="button"
        tabIndex={-1}
        onClick={handleOpen}
        onKeyPress={(): void => {}}
      >
        <Icon path="icons/cart" size="20" />
        <span className="user-menu__cart-quantity">(0)</span>
      </span>
      <span className="user-menu__cart-icon ml-1">
        {state.result ? <FontAwesomeIcon icon={faUser} /> : <FontAwesomeIcon icon={faSignInAlt} />}
      </span>
    </div>
  );
};

export default UserMenu;
