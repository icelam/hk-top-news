import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as newsActions from '@store/actions';
import NewsFeed from '@pages/NewsFeed';
import throttle from '@utils/throttle';

const NewsFeedContainer = () => {
  const dispatch = useDispatch();

  const fetchNews = useCallback(() => dispatch(
    newsActions.fetchNews()
  ), [dispatch]);

  const fetchFirstPageNews = useCallback(() => dispatch(
    newsActions.fetchFirstPageNews()
  ), [dispatch]);

  const fetchNextPageNews = useCallback(() => dispatch(
    newsActions.fetchNextPageNews()
  ), [dispatch]);

  const {
    pageLoading, pagination, newsArticles, totalPage, fetchError
  } = useSelector((state) => ({
    pageLoading: state.pageLoading,
    pagination: state.pagination,
    newsArticles: state.newsArticles,
    totalPage: state.totalPage,
    fetchError: state.fetchError
  }), shallowEqual);

  // Fetch page on page load and pagination change
  useEffect(() => {
    fetchFirstPageNews();
  }, [fetchFirstPageNews]);

  // Infinite scroll
  // Old position is stored to determine if user is scrolling down
  const [oldScrollPosition, setOldScrollPosition] = useState(0);

  useEffect(() => {
    const onScroll = throttle(() => {
      const htmlRoot = document.documentElement;
      const htmlBody = document.body;
      const scrollPosition = (htmlRoot.scrollTop || htmlBody.scrollTop);
      const documentHeight = (htmlRoot.scrollHeight || htmlBody.scrollHeight);
      const viewportheight = htmlRoot.clientHeight;

      const scrollRemaining = documentHeight - viewportheight - scrollPosition;
      const isScrollingDown = scrollPosition > oldScrollPosition;

      if (scrollRemaining < 500 && !pageLoading && isScrollingDown && pagination < totalPage) {
        fetchNextPageNews();
      }

      setOldScrollPosition(scrollPosition);
    }, 100);

    window.addEventListener('scroll', onScroll, false);
    return () => window.removeEventListener('scroll', onScroll, false);
  // Ignore oldScrollPosition to avoid infinite loop
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchNextPageNews, pageLoading, pagination, totalPage]);

  return (
    <NewsFeed
      retryFetch={fetchNews}
      pageLoading={pageLoading}
      newsArticles={newsArticles}
      fetchError={fetchError}
    />
  );
};

export default NewsFeedContainer;
