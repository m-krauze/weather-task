import React, { PropsWithChildren } from 'react';
import { useAppSelector } from '../../../../app/store';
import { Spinner } from '../../../../components/Spinner/Spinner';
import { ContentSection } from '../../../../components/ContentSection/ContentSection';
import { SelectedCityLabel } from '../SelectedCityLabel/SelectedCityLabel';
import { getClassName } from '../../../../utils/getClassName';
import { selectComparisonLocations, selectCurrentLocation } from '../../locationsSliceSelectors';

/**
 *  Elements
 */
interface ThProps {
  alignRight?: boolean;
}

function TH(props: PropsWithChildren<ThProps>) {
  const { children, alignRight } = props;
  return (
    <th className={getClassName([
      'py-2',
      'px-4',
      alignRight ? 'text-right' : 'text-;eft',
    ])}
    >
      {children}
    </th>
  );
}

function TD(props: PropsWithChildren<{}>) {
  const { children } = props;
  return (
    <td className={getClassName([
      'py-1',
      'px-5',
    ])}
    >
      {children}
    </td>
  );
}

/**
 * Component
 */

export function WeatherComparison() {
  const selectedLocation = useAppSelector(selectCurrentLocation);
  const comparisonLocations = useAppSelector(selectComparisonLocations);

  const selectedLocationNotLoaded = selectedLocation.status === 'pending' || selectedLocation.data === null;
  const comparisonLocationNotLoaded = comparisonLocations.status === 'pending' || comparisonLocations.data === null;

  if (selectedLocationNotLoaded || comparisonLocationNotLoaded
  ) {
    return <Spinner />;
  }

  return (
    <ContentSection title="Weather Comparison">
      <table>
        <tbody>
          <tr>
            <td />
            <TH>
              <SelectedCityLabel />
            </TH>
            {comparisonLocations.data!.map((location) => (
              <TH key={`w${location.location.lat}${location.location.lon}`}>
                {location.location.name}, {location.location.country}
              </TH>
            ))}
          </tr>
          <tr>
            <TH alignRight>Temp (<span>&#8451;</span>)</TH>
            <TD>{selectedLocation.data!.current.temp_c}</TD>
            {comparisonLocations.data!.map((location) => (
              <TD key={`t${location.location.lat}${location.location.lon}`}>
                {location.current.temp_c}
              </TD>
            ))}
          </tr>
          <tr>
            <TH alignRight>Wind (km/h)</TH>
            <TD>{selectedLocation.data!.current.wind_kph}</TD>
            {comparisonLocations.data!.map((location) => (
              <TD key={`w${location.location.lat}${location.location.lon}`}>
                {location.current.wind_kph}
              </TD>
            ))}
          </tr>
          <tr>
            <TH alignRight>Pressure (hPa)</TH>
            <TD>{selectedLocation.data!.current.pressure_mb}</TD>
            {comparisonLocations.data!.map((location) => (
              <TD key={`pr${location.location.lat}${location.location.lon}`}>
                {location.current.pressure_mb}
              </TD>
            ))}
          </tr>
          <tr>
            <TH alignRight>Rain (mm)</TH>
            <TD>{selectedLocation.data!.current.precip_mm}</TD>
            {comparisonLocations.data!.map((location) => (
              <TD key={`pc${location.location.lat}${location.location.lon}`}>
                {location.current.precip_mm}
              </TD>
            ))}
          </tr>
        </tbody>
      </table>
    </ContentSection>
  );
}
