import { waitFor } from '@testing-library/react';
import { CitySearchFormPOStandalone } from './CitySearchFormPO';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('CitySearchForm component', () => {
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

      citySearchSelect.updateInputValue('Warszawa');
      await citySearchForm.expectCityInList('Warszawa, Poland');
      await citySearchSelect.clickOption('Warszawa, Poland');
    });
  });
});
