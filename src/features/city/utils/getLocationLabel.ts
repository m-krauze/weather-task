import { GeoLocationWeather } from '../api/types';

export function getLocationLabel(locationWeather: GeoLocationWeather) {
  const { name, country } = locationWeather.location;
  return `${name}, ${country}`;
}
