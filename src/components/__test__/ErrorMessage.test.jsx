import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage';

const testMessage = 'Test Message';

describe('Error Message', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<ErrorMessage message={testMessage} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with correct error message', () => {
    render(<ErrorMessage message={testMessage} />);
    expect(screen.queryByText(testMessage)).toBeInTheDocument();
  });
});
