import axios from 'axios';
import { GeoLocation } from './types';

const apiHost = 'http://api.weatherapi.com/v1/';
const apiKey = '41e88fc377b644eb99893831221302';

export async function getLocations(query: string) {
  const url = `${apiHost}search.json`;
  const req = await axios.get<GeoLocation[]>(url, {
    params: {
      key: apiKey,
      q: query,
    },
  });

  return req.data;
}
