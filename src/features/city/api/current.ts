import axios from 'axios';
import { GeoLocationWeather } from './types';
import { apiHost, apiKey } from './global';

export async function getWeather(locationUrl: string) {
  const url = `${apiHost}current.json`;
  const req = await axios.get<GeoLocationWeather>(url, {
    params: {
      key: apiKey,
      q: locationUrl,
      /**
       * Air quality data
       */
      aqi: 'yes',
    },
  });

  return req.data;
}
