import React from 'react';
import {
  findAllByText,
  fireEvent, getByRole, getByText, render, waitFor,
} from '@testing-library/react';
import { CitySearchForm } from './CitySearchForm';
import { FormFieldPO } from '../../../../components/FormField/FormFieldPO';
import { SearchSelectPO } from '../../../../components/SearchSelect/SearchSelectPO';
import { MockedProvider } from '../../../../testUtils/MockedProvider';

export class CitySearchFormPO {
  private elements: {
    searchField: HTMLElement;
    searchButton: HTMLButtonElement;
  };

  constructor(protected container: HTMLElement) {
    this.elements = {
      searchButton: getByRole(container, 'button'),
      searchField: getByText(container, 'City').parentElement as HTMLElement,
    };
  }

  static bindTo(container: HTMLElement) {
    return new CitySearchFormPO(container);
  }

  getSearchFieldPO() {
    return FormFieldPO.bindTo(this.elements.searchField);
  }

  getCitySeachSelectPO() {
    return SearchSelectPO.bindTo(this.elements.searchField);
  }

  clickSearchButton() {
    fireEvent.click(this.elements.searchButton);
  }

  async expectCityInList(cityName: string) {
    await findAllByText(this.container, cityName);
  }

  expectComponentExists() {
    expect(this.container).toBeDefined();
    expect(this.container).not.toBeNull();
  }
}

export class CitySearchFormPOStandalone extends CitySearchFormPO {
  constructor(protected container: HTMLElement) {
    super(container);
  }

  static render() {
    const { container } = render(
      <MockedProvider>
        <CitySearchForm />
      </MockedProvider>,
    );

    return new CitySearchFormPOStandalone(container);
  }
}
