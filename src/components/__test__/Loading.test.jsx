import React from 'react';
import { render } from '@testing-library/react';
import Loading from '../Loading';

describe('Error Message', () => {
  it('renders correctly', () => {
    const { container, asFragment } = render(<Loading />);
    expect(container.querySelector('.MuiCircularProgress-svg')).toBeInTheDocument();
    expect(container.querySelector('.MuiCircularProgress-circle')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
