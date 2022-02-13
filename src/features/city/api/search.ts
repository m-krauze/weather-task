import axios from 'axios';
import { GeoLocation } from './types';
import { apiHost, apiKey } from './global';

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
