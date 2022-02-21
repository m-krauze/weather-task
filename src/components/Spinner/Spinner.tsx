import React from 'react';
import { SunIcon } from '@heroicons/react/outline';
import { getClassName } from '../../utils/getClassName';

export function Spinner() {
  return (
    <div className={getClassName([
      'flex',
      'justify-center',
      'p-4',
    ])}
    >
      <div
        className={getClassName([
          'animate-spin',
          'h-10',
          'w-10',
          'mr-3',
        ])}
      >
        <SunIcon className={getClassName([
          'fill-yellow-300',
          'stroke-amber-500',
        ])}
        />
      </div>
    </div>
  );
}
