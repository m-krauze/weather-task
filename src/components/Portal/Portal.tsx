import { PropsWithChildren, useEffect } from 'react';
import ReactDOM from 'react-dom';

export function Portal(props: PropsWithChildren<{}>) {
  const { children } = props;
  const portalChildContainer = document.createElement('div');
  const portal = document.getElementById('portal');

  useEffect(() => {
    if (!portal) {
      throw new Error('Portal is not defined.');
    }

    portal.appendChild(portalChildContainer);
  }, []);

  return ReactDOM.createPortal(
    children,
    portalChildContainer,
  );
}
