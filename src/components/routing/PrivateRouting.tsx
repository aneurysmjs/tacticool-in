import { ComponentType, ReactElement } from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { LoadableComponent } from '@loadable/component';

interface PrivateRouteProps {
  component: ComponentType<RouteComponentProps> | LoadableComponent<RouteComponentProps>;
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
      render={(props): ReactElement =>
        authed ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
        )
      }
    />
  );
}
