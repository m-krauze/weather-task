import { getClassName } from './getClassName';

describe('getClassName', () => {
  it('when no valid class name provided, should return an empty string', () => {
    expect(getClassName([
      undefined,
      null,
      '',
    ])).toMatch('');
  });

  it('when valid class names provided, returns a "nice" class list in string', () => {
    expect(getClassName([
      'name-a',
      'name-b',
      'name-3',
    ])).toMatch('name-a name-b name-3');
  });

  it('when valid and not valid class names provided, returns "nice" class list without invalid ones', () => {
    expect(getClassName([
      'name-a',
      undefined,
      null,
      'name-d',
    ])).toMatch('name-a name-d');
  });
});
