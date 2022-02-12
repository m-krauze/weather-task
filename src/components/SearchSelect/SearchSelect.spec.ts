import { screen } from '@testing-library/react';
import { SearchSelectPOStandalone } from './SearchSelectPO';
import { SearchSelectOption } from './SearchSelect';

const optionsMock: SearchSelectOption[] = [
  { value: 'value1', label: 'Label 1' },
  { value: 'value2', label: 'Label 2' },
  { value: 'value3', label: 'Label 3' },
  { value: 'value4', label: 'Label 4' },
];

describe('SearchSelect component', () => {
  it('renders without errors, with a placeholder', () => {
    const SearchSelectPO = SearchSelectPOStandalone.render({
      options: optionsMock,
      placeholder: 'test placeholder',
    });

    SearchSelectPO.expectComponentExists();
    screen.getByText('test placeholder');
  });

  it('when an item is selected, calls provided onSelect callback with proper value', () => {
    const onSelectMock = jest.fn();
    const SearchSelectPO = SearchSelectPOStandalone.render({
      options: optionsMock,
      placeholder: 'test placeholder',
      onSelect: onSelectMock,
    });

    SearchSelectPO.expectComponentExists();
    expect(onSelectMock).toHaveBeenCalledTimes(0);

    SearchSelectPO.selectOption(1);
    SearchSelectPO.clickOption('Label 1');

    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith({
      value: 'value1',
      label: 'Label 1',
    });
  });

  it('when search text does not match an item, show provided "no option message"', () => {
    const SearchSelectPO = SearchSelectPOStandalone.render({
      options: optionsMock,
      placeholder: 'test placeholder',
      noOptionsRender: (searchInput) => `Nothing found for ${searchInput}`,
    });

    SearchSelectPO.expectComponentExists();
    SearchSelectPO.updateInputValue('zxcasdqwe123');
    screen.getByText('Nothing found for zxcasdqwe123');
  });
});
