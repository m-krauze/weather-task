import React, { ReactNode } from 'react';
import Select, { Options, SingleValue } from 'react-select';

export interface SearchSelectOption {
  value: string;
  label: string;
}

export type SearchSelectValue = SingleValue<SearchSelectOption>;

export interface SearchSelectProps {
  options: Options<SearchSelectOption>;
  onSelect?: (newValue: SearchSelectValue) => void;
  value?: SearchSelectValue;
  placeholder?: string;
  noOptionsRender?: (searchInput: string) => ReactNode;
}

export function SearchSelect(props: SearchSelectProps) {
  const {
    options,
    value = undefined,
    onSelect = undefined,
    placeholder = undefined,
    noOptionsRender = (searchInput) => (
      <>
        No options for
        {searchInput}
      </>
    ),
  } = props;

  return (
    <Select
      options={options}
      value={value}
      onChange={(optionValue: SearchSelectValue) => {
        /**
         * Added cb here (instead of directly in props),
         * to omit second param (actionMeta) we receive from onChange.
         * We don't use it or test it.
         */
        if (onSelect) {
          onSelect(optionValue);
        }
      }}
      placeholder={placeholder}
      noOptionsMessage={(searchObj) => noOptionsRender(searchObj.inputValue)}
    />
  );
}
