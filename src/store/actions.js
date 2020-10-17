import getNews from '@services/newsService';
import * as types from './types';

const PAGE_SIZE = 10;

export const fetchNewsStart = () => ({
  type: types.FETCH_NEWS_START,
  pageLoading: true
});

const fetchNewsFinish = () => ({
  type: types.FETCH_NEWS_FINISH,
  pageLoading: false
});

const fetchNewsError = () => ({
  type: types.FETCH_NEWS_ERROR,
  fetchError: true
});

const updateNewsData = (articles) => ({
  type: types.UPDATE_NEWS_DATA,
  newsArticles: articles,
  fetchError: false
});

export const clearNewsData = () => ({
  type: types.CLEAR_NEWS_DATA,
  newsArticles: [],
  pagination: 1
});

export const updatePagination = (page) => ({
  type: types.UPDATE_PAGINATION,
  pagination: page
});

const updateTotalPage = (totalPage) => ({
  type: types.UPDATE_TOTAL_PAGE,
  totalPage
});

export const fetchNews = () => (dispatch, getState) => {
  dispatch(fetchNewsStart());

  const { pagination, keyword } = getState();

  getNews(pagination, PAGE_SIZE, keyword).then(({ data }) => {
    if (typeof data === 'object' && data.status === 'ok' && data.articles) {
      const totalPage = Math.ceil(data.totalResults / PAGE_SIZE);
      dispatch(updateNewsData(data.articles));
      dispatch(updateTotalPage(totalPage));
    } else {
      dispatch(fetchNewsError());
    }
  }).catch(() => {
    dispatch(fetchNewsError());
  }).finally(() => {
    dispatch(fetchNewsFinish());
  });
};

export const fetchFirstPageNews = () => (dispatch) => {
  dispatch(updatePagination(1));
  dispatch(fetchNews());
};

export const fetchNextPageNews = () => (dispatch, getState) => {
  const { pagination } = getState();
  dispatch(updatePagination(pagination + 1));
  dispatch(fetchNews());
};

export const refreshNews = () => (dispatch) => {
  dispatch(clearNewsData());
  dispatch(fetchNews());
};

const updateSearchKeyword = (keyword) => ({
  type: types.UPDATE_SEARCH_KEYWORD,
  keyword
});

export const fetchNewsWithKeyword = (searchKeyword) => (dispatch) => {
  dispatch(updateSearchKeyword(searchKeyword));
  dispatch(clearNewsData());
  dispatch(fetchNews());
};
