import { screen } from '@testing-library/react';
import { ModalPOStandalone } from './ModalPO';

describe('Modal component', () => {
  it('When portal container is not available, throws an error', () => {
    ModalPOStandalone.removePortal();

    ModalPOStandalone.expectPortalError();

    /**
     * Add the portal back for other tests
     */
    ModalPOStandalone.addPortal();
  });

  it('renders without errors, and outputs a child component', () => {
    ModalPOStandalone.render({
      children: 'Some modal content',
      close: () => {},
    });

    screen.getByText('Some modal content');
  });

  it.todo('calls provided close callback, on button click and overlay click');
});
