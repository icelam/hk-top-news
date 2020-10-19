import React from 'react';
import { render } from '@testing-library/react';
import ProgressBar from '../ProgressBar';

describe('Progress Bar', () => {
  it('renders correctly', () => {
    const { container, asFragment } = render(<ProgressBar data-testid="progress-bar" />);
    expect(container.firstChild).toHaveClass('MuiLinearProgress-root');
    expect(container.querySelector('.MuiLinearProgress-bar')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
