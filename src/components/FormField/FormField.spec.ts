import { PropsWithChildren } from 'react';
import { FormFieldPOStandalone } from './FormFieldPO';
import { FormFieldProps } from './FormField';

const mockedProps: Omit<PropsWithChildren<FormFieldProps>, 'message'> = {
  label: 'Field label',
  inputId: 'inputId1',
  children: '<input id="inputId1" type="text" aria-describedby="msgId" />',
};

describe('FormField component', () => {
  it('renders without errors', () => {
    const FormFieldPO = FormFieldPOStandalone.render({
      ...mockedProps,
    });

    FormFieldPO.expectComponentExists();
  });

  it('when message is provided, shows a form message', () => {
    const FormFieldPO = FormFieldPOStandalone.render({
      ...mockedProps,
      message: {
        ariaId: 'msgId',
        text: 'Some message',
        type: 'info',
      },
    });

    FormFieldPO.expectFieldMessage('Some message');
  });
  describe('when message is provided', () => {
    it('and the message is "info", show info styling', () => {
      const FormFieldPO = FormFieldPOStandalone.render({
        ...mockedProps,
        message: {
          ariaId: 'msgId',
          text: 'Some message',
          type: 'info',
        },
      });

      FormFieldPO.expectMessageStyling('info');
    });

    it('and the message is "warn", show warn styling', () => {
      const FormFieldPO = FormFieldPOStandalone.render({
        ...mockedProps,
        message: {
          ariaId: 'msgId',
          text: 'Some message',
          type: 'warn',
        },
      });

      FormFieldPO.expectMessageStyling('warn');
    });

    it('and the message is "error", show error styling', () => {
      const FormFieldPO = FormFieldPOStandalone.render({
        ...mockedProps,
        message: {
          ariaId: 'msgId',
          text: 'Some message',
          type: 'error',
        },
      });

      FormFieldPO.expectMessageStyling('error');
    });

    it('and the message is "success", show success styling', () => {
      const FormFieldPO = FormFieldPOStandalone.render({
        ...mockedProps,
        message: {
          ariaId: 'msgId',
          text: 'Some message',
          type: 'success',
        },
      });

      FormFieldPO.expectMessageStyling('success');
    });
  });
});
