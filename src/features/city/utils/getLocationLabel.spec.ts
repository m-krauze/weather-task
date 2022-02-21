import { getLocationLabel } from './getLocationLabel';
import { currentMock } from '../api/current.mock';

describe('getLocationLabel', () => {
  it('Returns "nice" location name for a given GeoLoactionWeather', () => {
    const locationLabel = getLocationLabel(currentMock);
    expect(locationLabel).toMatch('London, United Kingdom');
  });
});
