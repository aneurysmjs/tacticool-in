import { ComponentType, ReactElement } from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  component: ComponentType;
  authed: boolean;
}

export default function PrivateRoute({
  component: Component,
  authed,
  ...rest
}: PrivateRouteProps): ReactElement {
  return (
    <Route
      {...rest}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      render={(props): ReactElement =>
        authed ? (
          <Component {...props} />
        ) : (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <Navigate to={{ pathname: '/auth', state: { from: props.location } }} />
        )
      }
    />
  );
}
