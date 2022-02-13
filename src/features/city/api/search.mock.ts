import { rest } from 'msw';
import { apiHost, apiKey } from './global';
import { GeoLocation } from './types';

const locationsMock: GeoLocation[] = [
  {
    id: 120,
    region: 'someregion',
    country: 'Somecountry',
    name: 'LocationName 1',
    lat: 12,
    lon: -12,
    url: 'locationname-1',
  },
  {
    id: 121,
    region: 'someregion',
    country: 'Somecountry',
    name: 'LocationName 2',
    lat: 12,
    lon: -12,
    url: 'locationname-2',
  },
  {
    id: 122,
    region: 'someregion',
    country: 'Somecountry',
    name: 'LocationName 3',
    lat: 12,
    lon: -12,
    url: 'locationname-3',
  },
];

export const searchRequestHandlers = [
  rest.get(`${apiHost}search.json`, (req, res, context) => (res(
    context.json(locationsMock),
  ))),
];
