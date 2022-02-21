import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ContentWrap } from '../components/ContentWrap/ContentWrap';
import { getClassName } from '../utils/getClassName';
import { WeatherDetails } from '../features/city/components/WeatherDetails/WeatherDetails';
import { useAppDispatch, useAppSelector } from '../app/store';
import { closeSelectedLocationModal, getSelectedLocationWeather } from '../features/city/locationsSlice';
import { selectModalOpened } from '../features/city/locationsSliceSelectors';
import { Modal } from '../components/Modal/Modal';
import { CitySearchForm } from '../features/city/components/CitySearchForm/CitySearchForm';

export function WeatherPage() {
  const dispatch = useAppDispatch();
  const { city } = useParams<'city'>();
  const modalOpened = useAppSelector(selectModalOpened);

  useEffect(() => {
    if (!city) {
      throw new Error('City should be provided.');
    }

    dispatch(getSelectedLocationWeather(city));
  }, [ city ]);

  const closeModal = () => dispatch(closeSelectedLocationModal());

  return (
    <ContentWrap>
      <div className={getClassName([
        'p-4',
      ])}
      >
        <section>
          <WeatherDetails />
        </section>
        <section>
          Weather comparision
        </section>
      </div>
      {modalOpened && (
        <Modal close={closeModal}>
          <CitySearchForm afterSuccess={closeModal} />
        </Modal>
      )}
    </ContentWrap>
  );
}
