import React from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

import { FieldMessage, FormField } from '../../../../components/FormField/FormField';
import { SearchSelect, SearchSelectOption } from '../../../../components/SearchSelect/SearchSelect';
import { RootState, useAppDispatch, useAppSelector } from '../../../../app/store';
import { fetchByLocationName } from '../../locationsSlice';
import { getClassName } from '../../../../utils/getClassName';

interface CitySearchFormData {
  location: string;
}

export function CitySearchForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fetchedLocations = useAppSelector((state: RootState) => state.locations.fetchedLocations);

  const {
    handleSubmit, control, formState: { errors, submitCount },
  } = useForm<CitySearchFormData>();

  const onSubmit: SubmitHandler<CitySearchFormData> = (formData) => {
    navigate(`${formData.location}`);
  };

  const hasLocations = fetchedLocations.list.length > 0;
  const uniqueLocations = hasLocations ? _.uniqBy(fetchedLocations.list, 'url') : [];
  const options: SearchSelectOption[] = uniqueLocations.map((location) => ({
    value: location.url,
    label: `${location.name}, ${location.country}`,
  }));

  let msg: FieldMessage | undefined;
  if (!errors.location && submitCount === 0) {
    msg = {
      ariaId: 'locationAlertMessage',
      type: 'info',
      text: 'Please select preferred city.',
    };
  }
  if (errors.location && errors.location.type === 'required') {
    msg = {
      ariaId: 'locationAlertMessage',
      type: 'error',
      text: 'Please provide a proper location name and select a city.',
    };
  }

  return (
    <div className={getClassName([
      'p-8',
      'w-96',
    ])}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="City"
          inputId="location"
          message={msg}
        >
          <Controller
            control={control}
            name="location"
            rules={{
              required: 'Please provide a location name',
            }}
            render={({ field: { onChange } }) => (
              <SearchSelect
                inputId="location"
                options={options}
                isLoading={fetchedLocations.status === 'pending'}
                onInputChange={(val) => {
                  if (val !== '') {
                    dispatch(fetchByLocationName(val));
                  }
                }}
                onSelect={(selectedLocation) => {
                  if (selectedLocation) {
                    onChange(selectedLocation.value);
                  }
                }}
              />
            )}
          />
        </FormField>
        <div className={getClassName([
          'flex',
          'justify-end',
        ])}
        >
          <input
            type="submit"
            value="Search"
            className={getClassName([
              'border-b-2',
              'bg-sky-400',
              'text-white',
              'px-6',
              'py-2',
              'rounded-md',
              'cursor-pointer',
              'hover:bg-cyan-400',
              'transition-all',
            ])}
          />
        </div>
      </form>
    </div>
  );
}
