import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <Header onSearch={() => {}} searchValue="" refreshNews={() => {}} pageLoading={false} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with app logo, search input box and refresh button', () => {
    const { container } = render(
      <Header onSearch={() => {}} searchValue="" refreshNews={() => {}} pageLoading={false} />
    );
    expect(container.querySelector('#logo')).toBeInTheDocument();
    expect(container.querySelector('#app-name')).toBeInTheDocument();
    expect(container.querySelector('#search')).toBeInTheDocument();
    expect(container.querySelector('#refresh')).toBeInTheDocument();
  });

  it('should show progress bar when  page is loading', () => {
    const { container, rerender } = render(
      <Header onSearch={() => {}} searchValue="" refreshNews={() => {}} pageLoading={false} />
    );
    expect(container.querySelector('.MuiLinearProgress-bar')).toBeNull();

    rerender(
      <Header onSearch={() => {}} searchValue="" refreshNews={() => {}} pageLoading />
    );
    expect(container.querySelector('.MuiLinearProgress-bar')).toBeInTheDocument();
  });

  it('should should trigger onSearch when value in search input changed', () => {
    let query = '';
    const newQuery = '香港';
    const onSearch = jest.fn((event) => {
      query = event.target.value;
    });

    const { container, rerender } = render(
      <Header onSearch={onSearch} searchValue={query} refreshNews={() => {}} pageLoading />
    );

    const searchInput = container.querySelector('#search');
    expect(searchInput.value).toBe('');

    fireEvent.change(searchInput, { target: { value: newQuery } });
    rerender(<Header onSearch={onSearch} searchValue={query} refreshNews={() => {}} pageLoading />);
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(searchInput.value).toEqual(newQuery);
  });

  it('should should trigger refreshNews when refresh button is clicked', () => {
    const refreshNews = jest.fn();
    const { container } = render(
      <Header onSearch={() => {}} searchValue="" refreshNews={refreshNews} pageLoading={false} />
    );

    const refreshButton = container.querySelector('#refresh');
    fireEvent.click(refreshButton);
    expect(refreshNews).toHaveBeenCalledTimes(1);
  });
});
