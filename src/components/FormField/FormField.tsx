import React, { PropsWithChildren } from 'react';
import { getClassName } from '../../utils/getClassName';

export interface FormFieldProps {
  label: string;
  inputId: string;
  message?: FieldMessage;
}

export type FieldMessage = {
  ariaId: string;
  text: string;
  type: MessageType;
};

export type MessageType = 'info' | 'success' | 'error' | 'warn';

export function FormField(props: PropsWithChildren<FormFieldProps>) {
  const {
    children, label, inputId, message = undefined,
  } = props;

  return (
    <div className={getClassName([
      'flex',
      'flex-col',
      'min-w-400',
      'mb-6',
    ])}
    >
      <label
        className={getClassName([
          'text-xl',
          'pb-4',
          'underline',
          'underline-offset-1',
          'decoration-sky-400',
        ])}
        htmlFor={inputId}
      >
        {label}
      </label>
      <div className={getClassName([
        'mb-4',
        'px-2',
      ])}
      >
        {children}
      </div>
      {message && (
        <div className={getClassName([
          'flex',
          'px-2',
        ])}
        >
          <span
            id={message.ariaId}
            role="alert"
            className={getClassName([
              'py-1',
              'px-2',
              'rounded-lg',
              'border-2',
              message.type === 'info' && 'bg-slate-100 text-slate-600 border-slate-300',
              message.type === 'warn' && 'bg-orange-100 text-orange-600 border-orange-300',
              message.type === 'error' && 'bg-red-100 text-red-600 border-red-300',
              message.type === 'success' && 'bg-green-100 text-green-600 border-green-300',
            ])}
          >
            {message.text}
          </span>
        </div>
      )}
    </div>
  );
}
