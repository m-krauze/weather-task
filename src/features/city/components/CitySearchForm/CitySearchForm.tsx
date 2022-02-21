import React, { useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

import { FieldMessage, FormField } from '../../../../components/FormField/FormField';
import { SearchSelect, SearchSelectOption } from '../../../../components/SearchSelect/SearchSelect';
import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { fetchByLocationName } from '../../locationsSlice';
import { getClassName } from '../../../../utils/getClassName';
import { selectFetchedLocations } from '../../locationsSliceSelectors';

interface CitySearchFormData {
  location: string;
}

interface CitySearchFormProps {
  afterSuccess?: () => void;
}

export function CitySearchForm(props: CitySearchFormProps) {
  const { afterSuccess } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fetchedLocations = useAppSelector(selectFetchedLocations);
  const [ locationSelected, setLocationSelected ] = useState(false);

  const {
    handleSubmit, control, formState: { errors },
  } = useForm<CitySearchFormData>();
  const hasLocations = fetchedLocations.list.length > 0;
  const uniqueLocations = hasLocations ? _.uniqBy(fetchedLocations.list, 'url') : [];

  const options: SearchSelectOption[] = uniqueLocations.map((location) => ({
    value: location.url,
    label: `${location.name}, ${location.country}`,
  }));

  const onSubmit: SubmitHandler<CitySearchFormData> = (formData) => {
    navigate(`/${formData.location}`);

    if (afterSuccess) {
      afterSuccess();
    }
  };

  let msg: FieldMessage | undefined;
  if (!errors.location && !locationSelected) {
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
                    setLocationSelected(true);
                    onChange(selectedLocation.value);
                  } else {
                    setLocationSelected(false);
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
