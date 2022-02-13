import React, { ReactNode } from 'react';
import Select, { Options, SingleValue } from 'react-select';

export interface SearchSelectOption {
  value: string;
  label: string;
}

export type SearchSelectValue = SingleValue<SearchSelectOption>;

export interface SearchSelectProps {
  options: Options<SearchSelectOption>;
  inputId: string;
  isLoading?: boolean;
  onInputChange?: (query: string) => void;
  onSelect?: (newValue: SearchSelectValue) => void;
  value?: SearchSelectValue;
  placeholder?: string;
  noOptionsRender?: (searchInput: string) => ReactNode;
}

export function SearchSelect(props: SearchSelectProps) {
  const {
    options,
    inputId,
    onInputChange,
    isLoading = undefined,
    value = undefined,
    onSelect = undefined,
    placeholder = undefined,
    noOptionsRender = (searchInput) => (
      <>
        No options for
        {' '}
        {searchInput}
      </>
    ),
  } = props;

  return (
    <Select
      inputId={inputId}
      options={options}
      value={value}
      isLoading={isLoading}
      /**
       * For onInputChange and onChange:
       * Added cb (instead of directly in props),
       * to omit second param (actionMeta) we receive from onChange and onInputChange.
       * We don't use it or test it.
       */
      onInputChange={(query: string) => {
        if (onInputChange) {
          onInputChange(query);
        }
      }}
      onChange={(optionValue: SearchSelectValue) => {
        if (onSelect) {
          onSelect(optionValue);
        }
      }}
      placeholder={placeholder}
      noOptionsMessage={(searchObj) => noOptionsRender(searchObj.inputValue)}
    />
  );
}
