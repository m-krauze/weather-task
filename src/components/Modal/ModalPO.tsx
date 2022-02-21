import React, { ReactNode } from 'react';
import { fireEvent, getByRole, render } from '@testing-library/react';

import { Modal } from './Modal';

export class ModalPO {
  private elements: {
    closeBtn: HTMLButtonElement;
  };

  protected constructor(
    protected container: HTMLElement,
  ) {
    this.elements = {
      closeBtn: getByRole(container, 'button', {
        name: 'close modal',
      }),
    };
  }

  static bindTo(container: HTMLElement) {
    return new ModalPO(container);
  }

  clickCloseBtn() {
    fireEvent.click(this.elements.closeBtn);
  }
}

export class ModalPOStandalone extends ModalPO {
  protected constructor(
    protected container: HTMLElement,
  ) {
    super(container);
  }

  static render(props: {
    children: ReactNode;
    close: () => void;
  }) {
    const { close, children } = props;
    const modalPortal = document.getElementById('modal-portal');

    const { container } = render(
      <Modal close={close}>
        {children}
      </Modal>,
      {
        /**
         * In case of components being rendered in portal, we'd receive empty div by default.
         * (rtl renders components to doc > body > new, empty div)
         * Setting container to modal portal in options does the trick.
         * Solution found here - https://github.com/testing-library/react-testing-library/issues/62
         */
        container: modalPortal || undefined,
      },
    );

    return new ModalPOStandalone(container);
  }

  static removePortal() {
    const portal = document.getElementById('modal-portal');
    if (!portal) {
      throw new Error('Portal container is not in DOM. It should be configured in setupTests.ts');
    }

    portal.remove();
  }

  static addPortal() {
    const appPortal = document.createElement('div');
    appPortal.id = 'modal-portal';
    document.body.append(appPortal);
  }

  static expectPortalError() {
    expect(() => render(<Modal close={() => {}}>Test</Modal>)).toThrow('Portal is not defined.');
  }
}
