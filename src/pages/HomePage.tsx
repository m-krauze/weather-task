import React from 'react';
import { getClassName } from '../utils/getClassName';
import { CitySearchForm } from '../features/city/components/CitySearchForm/CitySearchForm';

export function HomePage() {
  return (
    <div className={getClassName([
      'flex',
      'justify-center',
    ])}
    >
      <div className={getClassName([
        'border-2',
        'border-sky-400',
        'rounded-md',
      ])}
      >
        <CitySearchForm />
      </div>
    </div>
  );
}
