import React from 'react';
import { ContentWrap } from '../components/ContentWrap/ContentWrap';
import { getClassName } from '../utils/getClassName';

export function Page404() {
  return (
    <ContentWrap>
      <div
        className={getClassName([
          'flex',
          'flex-col',
          'justify-center',
          'p-2',
        ])}
      >
        <h1 className={getClassName([
          'text-4xl',
          'flex-grow',
          'text-center',
          'p-8',
          'text-red-900',
          'decoration-red-600',
          'underline',
          'underline-offset-2',
        ])}
        >
          404 error!
        </h1>
        <span className={getClassName([
          'bg-red-100',
          'border-2',
          'border-red-600',
          'rounded-md',
          'p-2',
          'text-red-900',
        ])}
        >
          Page not found!
        </span>
      </div>
    </ContentWrap>
  );
}
