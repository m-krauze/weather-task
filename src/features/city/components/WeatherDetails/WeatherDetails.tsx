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

interface DetailsBoxProps {
  title: string;
}

function DetailsBox(props: PropsWithChildren<DetailsBoxProps>) {
  const { children, title } = props;

  return (
    <div
      className={getClassName([
        'flex',
        'flex-col',
        'p-4',
      ])}
    >
      <h5 className={getClassName([
        'text-lg',
        'font-bold',
      ])}
      >
        {title}
      </h5>
      <div>
        {children}
      </div>
    </div>
  );
}

interface WindDetailsProps {
  windKph: number;
  windDir: string;
}

function WindDetails(props: WindDetailsProps) {
  const { windKph, windDir } = props;
  return (
    <DetailsBox title="Wind">
      {windKph} km/h <br />
      direction - {windDir}
    </DetailsBox>
  );
}

interface PressureDetailsProps {
  pressureMb: number;
}

function PressureDetails(props: PressureDetailsProps) {
  const { pressureMb } = props;

  return (
    <DetailsBox title="Pressure">
      {pressureMb} hPa
    </DetailsBox>
  );
}

interface RainDetailsProps {
  precipMm: number;
}

function RainDetails(props: RainDetailsProps) {
  const { precipMm } = props;

  return (
    <DetailsBox title="Rain">
      {precipMm} mm
    </DetailsBox>
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
    <ContentSection title="Weather Details">
      <div className={getClassName([
        'flex',
        'justify-between',
        'items-center',
      ])}
      >
        <SelectedCityLabel big />
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
          >
            <WindDetails
              windKph={data.current.wind_kph}
              windDir={data.current.wind_dir}
            />
            <PressureDetails pressureMb={data.current.pressure_mb} />
            <RainDetails precipMm={data.current.precip_mm} />
          </div>
        </div>
      </div>
    </ContentSection>
  );
}
