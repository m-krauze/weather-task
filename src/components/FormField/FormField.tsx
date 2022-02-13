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
    <div>
      <label htmlFor={inputId}>
        {label}
      </label>
      {children}
      {message && (
        <div className={getClassName([
          'flex',
        ])}
        >
          <span
            id={message.ariaId}
            role="alert"
            className={getClassName([
              'p-2',
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
