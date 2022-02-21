import React, { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import { XIcon } from '@heroicons/react/solid';

import { getClassName } from '../../utils/getClassName';

interface ModalProps {
  close: () => void
}

export function Modal(props: PropsWithChildren<ModalProps>) {
  const { children, close } = props;
  const modalPortal = document.getElementById('modal-portal');

  if (!modalPortal) {
    throw new Error('Portal is not defined.');
  }

  return ReactDOM.createPortal(
    <div
      className={getClassName([
        'fixed',
        'inset-0',
        'bg-gray-600',
        'bg-opacity-50',
        'overflow-y-auto',
        'h-full',
        'w-full',
        'flex',
        'flex-col',
      ])}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          close();
        }
      }}
      role="dialog"
    >
      <div
        className={getClassName([
          'relative',
          'top-20',
          'mx-auto',
          'p-5',
          'border',
          'shadow-lg',
          'rounded-md',
          'bg-white',
          'relative',
        ])}
      >
        {children}
        <button
          type="button"
          className={getClassName([
            'absolute',
            'right-10',
            'top-10',
            'w-5',
            'h-5',
          ])}
          onClick={close}
          aria-label="close modal"
        >
          <XIcon fill="color-sky-400" />
        </button>
      </div>
    </div>,
    modalPortal,
  );
}
