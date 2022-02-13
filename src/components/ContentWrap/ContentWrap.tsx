import React, { PropsWithChildren } from 'react';
import { getClassName } from '../../utils/getClassName';

export function ContentWrap(props: PropsWithChildren<{}>) {
  const { children } = props;
  return (
    <div className={getClassName([
      'border-2',
      'border-sky-400',
      'rounded-md',
    ])}
    >
      {children}
    </div>
  );
}
