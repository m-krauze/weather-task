import React from 'react';
import { PencilAltIcon } from '@heroicons/react/solid';

import { getLocationLabel } from '../../utils/getLocationLabel';
import { getClassName } from '../../../../utils/getClassName';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { selectCurrentLocation } from '../../locationsSliceSelectors';
import { openSelectedLocationModal } from '../../locationsSlice';

export function SelectedCityLabel() {
  const location = useAppSelector(selectCurrentLocation);
  const dispatch = useAppDispatch();

  const onButtonClick = () => {
    dispatch(openSelectedLocationModal());
  };

  if (!location.data) {
    return <>Loading ...</>;
  }

  return (
    <div className={getClassName([
      'flex',
      'items-center',
    ])}
    >
      <h3 className={getClassName([
        'font-bold',
        'text-xl',
      ])}
      >
        {getLocationLabel(location.data)}
      </h3>
      <button
        type="button"
        className={getClassName([
          'ml-4',
        ])}
        onClick={onButtonClick}
      >
        <div
          className={getClassName([
            'p-2',
            'rounded-md',
            'bg-sky-400',
            'hover:bg-cyan-400',
            'transition-all',
          ])}
        >
          <div className={getClassName([
            'h-6',
            'w-6',
          ])}
          >
            <PencilAltIcon fill="#FFFFFF" />
          </div>
        </div>
      </button>
    </div>
  );
}
