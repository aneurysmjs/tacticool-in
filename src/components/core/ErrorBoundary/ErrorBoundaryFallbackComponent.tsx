import { FunctionComponent, HTMLAttributes } from 'react';

type PropsType = {
  componentStack: string;
  error: Error;
};

const toTitle = (error: Error, componentStack: string): string =>
  `${error.toString()}\n\nThis is located at:${componentStack}`;

const style: HTMLAttributes<HTMLDivElement>['style'] = {
  alignItems: 'center',
  boxSizing: 'border-box',
  color: '#FFF',
  cursor: 'help',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  maxHeight: '100vh',
  maxWidth: '100vw',
  textAlign: 'center',
  width: '100%',
};

const ErrorBoundaryFallbackComponent: FunctionComponent<PropsType> = ({
  componentStack,
  error,
}) => (
  <div style={style} title={toTitle(error, componentStack)}>
    <pre>{componentStack}</pre>
  </div>
);

export default ErrorBoundaryFallbackComponent;
