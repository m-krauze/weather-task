import React from 'react';
import {
  fireEvent, getByRole, getByText, render, screen, waitFor,
} from '@testing-library/react';
import { SearchSelect, SearchSelectProps } from './SearchSelect';

export class SearchSelectPO {
  private elements: {
    textInput: HTMLInputElement
  };

  constructor(
    protected container: HTMLElement,
  ) {
    this.elements = {
      textInput: getByRole(container, 'combobox'),
    };
  }

  static bindTo(container: HTMLElement) {
    return new SearchSelectPO(container);
  }

  selectOption(targetIndex: number) {
    if (!this.container.firstChild) {
      throw new Error('SearchSelect was not rendered correctly. firstChild is missing.');
    }

    for (let selectedIndex = 0; selectedIndex < targetIndex; selectedIndex += 1) {
      fireEvent.keyDown(this.container.firstChild, { key: 'ArrowDown' });
    }
  }

  updateInputValue(newValue: string) {
    fireEvent.change(this.elements.textInput, {
      target: {
        value: newValue,
      },
    });
  }

  async clickOption(label: string) {
    fireEvent.click(getByText(this.container, label));
  }

  expectComponentExists() {
    expect(this.container).toBeDefined();
    expect(this.container).not.toBeNull();
  }
}

export class SearchSelectPOStandalone extends SearchSelectPO {
  protected constructor(protected container: HTMLElement) {
    super(container);
  }

  static render(props: SearchSelectProps) {
    const { container } = render(
      <SearchSelect {...props} />,
    );

    return new SearchSelectPOStandalone(container);
  }
}
