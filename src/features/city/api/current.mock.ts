import { rest } from 'msw';
import { GeoLocationWeather } from './types';
import { apiHost } from './global';

export const currentMock: GeoLocationWeather = {
  location: {
    name: 'London',
    region: 'City of London, Greater London',
    country: 'United Kingdom',
    lat: 51.52,
    lon: -0.11,
    tz_id: 'Europe/London',
    localtime_epoch: 1644927208,
    localtime: '2022-02-15 12:13',
  },
  current: {
    last_updated_epoch: 1644922800,
    last_updated: '2022-02-15 11:00',
    temp_c: 9.0,
    temp_f: 48.2,
    is_day: 1,
    condition: {
      text: 'Light rain',
      icon: '//cdn.weatherapi.com/weather/64x64/day/296.png',
      code: 1183,
    },
    wind_mph: 19.2,
    wind_kph: 31.0,
    wind_degree: 220,
    wind_dir: 'SW',
    pressure_mb: 1006.0,
    pressure_in: 29.71,
    precip_mm: 0.0,
    precip_in: 0.0,
    humidity: 87,
    cloud: 75,
    feelslike_c: 5.6,
    feelslike_f: 42.2,
    vis_km: 10.0,
    vis_miles: 6.0,
    uv: 2.0,
    gust_mph: 21.7,
    gust_kph: 34.9,
    air_quality: {
      co: 260.3999938964844,
      no2: 14.699999809265137,
      o3: 60.099998474121094,
      so2: 6.699999809265137,
      pm2_5: 1.5,
      pm10: 1.7999999523162842,
    },
  },
};

export const currentRequestHandlers = [
  rest.get(`${apiHost}current.json`, (req, res, context) => (res(
    context.json(currentMock),
  ))),
];
