import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as newsActions from '@store/actions';
import Header from '@components/Header';
import useDebounce from '@hooks/useDebounce';

const HeaderContainer = () => {
  const dispatch = useDispatch();

  const fetchNewsWithKeyword = useCallback((keyword) => dispatch(
    newsActions.fetchNewsWithKeyword(keyword)
  ), [dispatch]);

  const refreshNews = useCallback(() => dispatch(
    newsActions.refreshNews()
  ), [dispatch]);

  const {
    pageLoading, keyword
  } = useSelector((state) => ({
    pageLoading: state.pageLoading,
    keyword: state.keyword
  }));

  // debounce search
  const [searchKeyword, setSeachKeyword] = useState(keyword);
  const debouncedSeachKeyword = useDebounce(searchKeyword, 500);

  const onSearch = (event) => {
    setSeachKeyword(event.target.value);
  };

  useEffect(() => {
    // Prevent double firing on app launch by checking if debounced value
    // is equal to the one stored in redux (initial state)
    if (debouncedSeachKeyword !== keyword) {
      fetchNewsWithKeyword(debouncedSeachKeyword);
    }
  }, [debouncedSeachKeyword, keyword, fetchNewsWithKeyword]);

  return (
    <Header
      pageLoading={pageLoading}
      onSearch={onSearch}
      refreshNews={refreshNews}
      searchValue={searchKeyword}
    />
  );
};

export default HeaderContainer;
