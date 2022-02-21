import React, { PropsWithChildren } from 'react';
import { RootState, useAppSelector } from '../../../../app/store';
import { Spinner } from '../../../../components/Spinner/Spinner';
import { getClassName } from '../../../../utils/getClassName';
import { GeoLocationWeather } from '../../api/types';
import { ContentSection } from '../../../../components/ContentSection/ContentSection';
import { SelectedCityLabel } from '../SelectedCityLabel/SelectedCityLabel';

/**
 * Elements
 */
function TempBox({ degrees }: PropsWithChildren<{ degrees: number }>) {
  return (
    <div className={getClassName([
      'p-8',
      'text-2xl',
      'font-black',
      'flex',
      'justify-center',
      'items-center',
    ])}
    >
      <div>
        <span>
          {degrees}
        </span>
        <span>&#8451;</span>
      </div>
    </div>
  );
}

function ConditionsBox({ condition }: PropsWithChildren<{ condition: GeoLocationWeather['current']['condition']; }>) {
  return (
    <div className={getClassName([
      'p-1',
      'pr-8',
      'border-r-2',
      'border-sky-400',
    ])}
    >
      {condition.text}
      <img
        alt={condition.text}
        src={condition.icon}
      />
    </div>
  );
}

/**
 * Component
 */
export function WeatherDetails() {
  const { status, data } = useAppSelector((state: RootState) => state.locations.selectedLocation);

  if (status === 'pending' || data === null) {
    return <Spinner />;
  }

  return (
    <div>
      <ContentSection title="Weather Details">
        <div className={getClassName([
          'flex',
          'justify-between',
          'items-center',
        ])}
        >
          <SelectedCityLabel />
          <div className={getClassName([
            'ml-10',
          ])}
          >
            <h5>
              Last updated: &nbsp;
              {data.current.last_updated}
            </h5>
          </div>
        </div>
        <div className={getClassName([
          'flex',
          'flex-col',
        ])}
        >
          <div className={getClassName([
            'p-2',
            'flex',
          ])}
          >
            <div className={getClassName([
              'flex',
            ])}
            >
              <ConditionsBox condition={data.current.condition} />
              <TempBox degrees={data.current.temp_c} />
            </div>
            <div className={getClassName([
              'flex',
            ])}
            />
          </div>
        </div>
      </ContentSection>
    </div>
  );
}
