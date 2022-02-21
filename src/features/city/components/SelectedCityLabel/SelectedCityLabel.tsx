import React from 'react';
import { PencilAltIcon } from '@heroicons/react/solid';

import { getLocationLabel } from '../../utils/getLocationLabel';
import { getClassName } from '../../../../utils/getClassName';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { selectCurrentLocation } from '../../locationsSliceSelectors';
import { openSelectedLocationModal } from '../../locationsSlice';

interface SelectedCityLabelProps {
  big?: boolean
}

export function SelectedCityLabel(props: SelectedCityLabelProps) {
  const { big } = props;
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
        big && 'text-xl',
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
            big ? 'h-6' : 'w-3',
            big ? 'w-6' : 'w-3',
          ])}
          >
            <PencilAltIcon fill="#FFFFFF" />
          </div>
        </div>
      </button>
    </div>
  );
}
