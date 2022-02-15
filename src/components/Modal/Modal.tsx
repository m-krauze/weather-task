import React, { PropsWithChildren } from 'react';
import { getClassName } from '../../utils/getClassName';
import { Portal } from '../Portal/Portal';

export function Modal(props: PropsWithChildren<{}>) {
  const { children } = props;

  return (
    <Portal>
      <div
        className={getClassName([
          'fixed',
          'inset-0',
          'bg-gray-600',
          'bg-opacity-50',
          'overflow-y-auto',
          'h-full',
          'w-full',
        ])}
      />
      <div
        className={getClassName([
          'relative',
          'top-20',
          'mx-auto',
          'p-5',
          'border',
          'w-96',
          'shadow-lg',
          'rounded-md',
          'bg-white',
        ])}
      >
        {children}
      </div>
    </Portal>
  );
}
