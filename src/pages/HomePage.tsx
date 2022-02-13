import React from 'react';
import { CitySearchForm } from '../features/city/components/CitySearchForm/CitySearchForm';
import { ContentWrap } from '../components/ContentWrap/ContentWrap';

export function HomePage() {
  return (
    <ContentWrap>
      <CitySearchForm />
    </ContentWrap>
  );
}
