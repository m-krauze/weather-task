import React, { PropsWithChildren } from 'react';
import { getClassName } from '../../utils/getClassName';

interface ContentSectionProps {
  title: string;
}

export function ContentSection(props: PropsWithChildren<ContentSectionProps>) {
  const { title, children } = props;

  return (
    <section className={getClassName([
      'flex',
      'flex-col',
      'py-4',
      'px-2',
      'border-b-2',
      'border-sky-400',
      'mb-2',
    ])}
    >
      <h2>
        {title}
      </h2>
      <div>
        {children}
      </div>
    </section>
  );
}
