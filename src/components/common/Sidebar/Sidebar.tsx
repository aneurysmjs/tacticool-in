import React, {
  Fragment,
  useEffect,
  useRef,
  ReactElement,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import Icon from '~/components/base/Icon';
import { KEYBOARD } from '~/constants';

import './Sidebar.scss';

type PropsType = {
  isOpen?: boolean;
  side?: string;
  onClose?: () => void;
  title?: string;
  children?: ReactNode;
};

function Sidebar({
  isOpen = false,
  side = 'right',
  onClose = (): void => {},
  title = 'sidebar',
  children,
}: PropsType): null | ReactElement {
  // just to keep track whether the sidebar is closing or not.
  const [isClosing, setIsClosing] = useState(false);
  // reference to the sidebar element.
  const asideRef = useRef<HTMLElement>(null);

  const closeSidebar = useCallback((): void => {
    setIsClosing(true);
  }, []);

  /**
   * @link https://stackoverflow.com/questions/53834672/flow-type-keydown-event
   */
  const handleKeyDown = useCallback(
    (evt: KeyboardEvent): void => {
      if (isOpen && evt.keyCode === KEYBOARD.ESCAPE_KEY) {
        closeSidebar();
      }
    },
    [closeSidebar, isOpen],
  );

  const handleTransitionEnd = useCallback((): void => {
    setIsClosing(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    /**
     * The ref value 'asideRef.current' will likely have changed by the time this effect
     * cleanup function runs. If this ref points to a node rendered by React,
     * copy 'asideRef.current' to a variable inside the effect, and use that variable
     * in the cleanup function.eslint(react-hooks/exhaustive-deps)
     */
    const aside = asideRef.current;

    document.addEventListener('keydown', handleKeyDown);

    /**
     * only listen to `transitionend` when is closing
     */
    if (isClosing && aside) {
      aside.addEventListener('transitionend', handleTransitionEnd);
    }

    return (): void => {
      if (aside) {
        aside.removeEventListener('transitionend', handleTransitionEnd);
      }
      // remove listener when this "cleanup" function runs
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [asideRef, handleKeyDown, handleTransitionEnd, isClosing, isOpen, side]);

  return isOpen
    ? createPortal(
        <Fragment>
          <div
            className={`sidebar__overlay sidebar__overlay--fade-${isClosing ? 'out' : 'in'}`}
            data-testid="overlay"
            role="presentation"
            onClick={closeSidebar}
            onKeyPress={(): void => {}}
          />
          <aside
            ref={asideRef}
            className={`sidebar sidebar--${side} ${isClosing ? '' : `sidebar--open-${side}`}`}
            data-testid="sidebar"
          >
            <header className="sidebar__header">
              <h3 className="sidebar__title">{title}</h3>
              <button
                className="sidebar__close"
                data-testid="close"
                tabIndex={-1}
                onClick={closeSidebar}
                onKeyPress={(): void => {}}
              >
                <Icon path="icons/close" />
              </button>
            </header>
            <div className="sidebar__content" data-testid="content">
              {children}
            </div>
          </aside>
        </Fragment>,
        document.body,
      )
    : null;
}

export default Sidebar;
