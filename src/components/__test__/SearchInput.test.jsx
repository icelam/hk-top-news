import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchInput from '../SearchInput';

describe('Search Input', () => {
  it('renders correctly', () => {
    const { asFragment } = render(
      <SearchInput onSearch={() => {}} searchValue="" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should set id accoring to props', () => {
    const { container } = render(
      <SearchInput onSearch={() => {}} searchValue="" id="search" />
    );
    expect(container.querySelector('input#search')).toBeInTheDocument();
  });

  it('should set class accoring to props', () => {
    const { container } = render(
      <SearchInput onSearch={() => {}} searchValue="" className="search-input-class" />
    );
    expect(container.firstChild).toHaveClass('search-input-class');
  });

  it('should should trigger onSearch when value in search input changed', () => {
    let query = '';
    const newQuery = '香港';
    const onSearch = jest.fn((event) => {
      query = event.target.value;
    });

    const { container, rerender } = render(
      <SearchInput onSearch={onSearch} searchValue={query} id="search" />
    );

    const searchInput = container.querySelector('#search');
    expect(searchInput.value).toBe('');

    fireEvent.change(searchInput, { target: { value: newQuery } });
    rerender(<SearchInput onSearch={onSearch} searchValue={query} />);
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(searchInput.value).toEqual(newQuery);
  });
});
