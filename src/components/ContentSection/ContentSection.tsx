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
      'p-2',
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
