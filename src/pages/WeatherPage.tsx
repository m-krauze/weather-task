import React from 'react';
import { ContentWrap } from '../components/ContentWrap/ContentWrap';
import { getClassName } from '../utils/getClassName';

export function WeatherPage() {
  return (
    <ContentWrap>
      <div className={getClassName([
        'p-4',
      ])}
      >
        <section>
          Weather details
        </section>
        <section>
          Weather comparision
        </section>
      </div>
    </ContentWrap>
  );
}
