import React, { PropsWithChildren } from 'react';
import { getByText, queryByRole, render } from '@testing-library/react';

import { FormField, FormFieldProps, MessageType } from './FormField';

export class FormFieldPO {
  private elements: {
    message: HTMLElement | null;
  };

  protected constructor(protected container: HTMLElement) {
    this.elements = {
      message: queryByRole(this.container, 'alert'),
    };
  }

  static bindTo(container: HTMLElement) {
    return new FormFieldPO(container);
  }

  expectFieldMessage(messageText: string) {
    if (!this.elements.message) {
      throw new Error('Expecting a message while it was not defined.');
    }

    expect(this.elements.message).toBeDefined();
    getByText(this.elements.message, messageText);
  }

  expectMessageStyling(styling: MessageType) {
    if (!this.elements.message) {
      throw new Error('Expecting a message while it was not defined.');
    }

    if (styling === 'info') {
      expect(this.elements.message.className).toContain('bg-slate-100 text-slate-600 border-slate-300');
    }

    if (styling === 'warn') {
      expect(this.elements.message.className).toContain('bg-orange-100 text-orange-600 border-orange-300');
    }

    if (styling === 'error') {
      expect(this.elements.message.className).toContain('bg-red-100 text-red-600 border-red-300');
    }

    if (styling === 'success') {
      expect(this.elements.message.className).toContain('bg-green-100 text-green-600 border-green-300');
    }
  }

  expectComponentExists() {
    expect(this.container).toBeDefined();
    expect(this.container).not.toBeNull();
  }
}

export class FormFieldPOStandalone extends FormFieldPO {
  protected constructor(container: HTMLElement) {
    super(container);
  }

  static render(props: PropsWithChildren<FormFieldProps>) {
    const { container } = render(
      <FormField {...props} />,
    );

    return new FormFieldPOStandalone(container);
  }
}
