import { waitFor } from '@testing-library/react';
import { CitySearchFormPOStandalone } from './CitySearchFormPO';
import { setupMockServer } from '../../../../testUtils/setupMockServer';
import { searchRequestHandlers } from '../../api/search.mock';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('CitySearchForm component', () => {
  setupMockServer(...searchRequestHandlers);

  it('renders without errors', () => {
    const citySearchForm = CitySearchFormPOStandalone.render();

    citySearchForm.expectComponentExists();
  });

  describe('when search button is clicked', () => {
    it('and no city is chosen, show error message', async () => {
      const citySearchForm = CitySearchFormPOStandalone.render();
      const citySearchSelect = citySearchForm.getCitySeachSelectPO();

      citySearchForm.expectComponentExists();
      citySearchSelect.expectValueSelected('');

      citySearchForm.clickSearchButton();

      await waitFor(() => {
        const cityInputField = citySearchForm.getSearchFieldPO();

        cityInputField.expectFieldMessage('Please provide a location name');
        cityInputField.expectMessageStyling('error');
      });
    });

    it('and city is selected, navigate to city page', async () => {
      const citySearchForm = CitySearchFormPOStandalone.render();
      const citySearchSelect = citySearchForm.getCitySeachSelectPO();

      citySearchForm.expectComponentExists();
      citySearchSelect.expectValueSelected('');

      citySearchSelect.updateInputValue('LocationName');
      await citySearchForm.expectCityInList('LocationName 3, Somecountry');
      await citySearchSelect.clickOption('LocationName 3, Somecountry');

      citySearchForm.clickSearchButton();

      await waitFor(() => {
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
      });
    });
  });
});
