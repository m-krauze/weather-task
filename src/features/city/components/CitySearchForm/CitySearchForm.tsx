import React from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

import { FieldMessage, FormField } from '../../../../components/FormField/FormField';
import { SearchSelect, SearchSelectOption } from '../../../../components/SearchSelect/SearchSelect';
import { RootState, useAppDispatch, useAppSelector } from '../../../../app/store';
import { fetchByLocationName } from '../../locationsSlice';

interface CitySearchFormData {
  location: string;
}

export function CitySearchForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fetchedLocations = useAppSelector((state: RootState) => state.locations.fetchedLocations);

  const {
    handleSubmit, control, formState: { errors },
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
  if (errors.location && errors.location.type === 'required') {
    msg = {
      ariaId: 'locationAlertMessage',
      type: 'error',
      text: 'Please provide a location name',
    };
  }

  return (
    <div>
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
                isLoading={fetchedLocations.status === 'loading'}
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
        <input
          type="submit"
          value="Search"
        />
      </form>
    </div>
  );
}
