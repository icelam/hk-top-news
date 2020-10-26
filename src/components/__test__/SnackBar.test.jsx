import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SnackBar from '../SnackBar';

const message = 'Test Message';
const buttonText = 'OK';
const buttonAction = jest.fn();

describe('Snack Bar', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <SnackBar message={message} buttonText={buttonText} buttonAction={buttonAction} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with correct message', () => {
    const { container } = render(
      <SnackBar message={message} buttonText={buttonText} buttonAction={buttonAction} />
    );
    expect(container.querySelector('.MuiSnackbarContent-message')).toHaveTextContent(message);
  });

  it('should render button with correct label', () => {
    const { container } = render(
      <SnackBar message={message} buttonText={buttonText} buttonAction={buttonAction} />
    );
    expect(container.querySelector('button')).toBeInTheDocument();
    expect(container.querySelector('.MuiButton-label')).toHaveTextContent(buttonText);
  });

  it('should trigger buttonAction when clicking on button', () => {
    const { container } = render(
      <SnackBar message={message} buttonText={buttonText} buttonAction={buttonAction} />
    );
    const button = container.querySelector('button');
    fireEvent.click(button);
    expect(buttonAction).toHaveBeenCalledTimes(1);
  });
});
