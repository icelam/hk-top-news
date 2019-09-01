import getNews from '@services/newsService';
import * as types from './types';

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

const updateNewsData = articles => ({
  type: types.UPDATE_NEWS_DATA,
  newsArticles: articles
});

export const clearNewsData = () => ({
  type: types.CLEAR_NEWS_DATA,
  newsArticles: [],
  pagination: 0
});

const updatePagination = page => ({
  type: types.UPDATE_PAGINATION,
  pagination: page
});

export const fetchNews = page => (dispatch) => {
  dispatch(fetchNewsStart());

  getNews(page).then(({ data }) => {
    if (typeof data === 'object' && Object.prototype.hasOwnProperty.call(data, 'articles')) {
      dispatch(updateNewsData(data.articles));
      dispatch(updatePagination(page));
    } else {
      dispatch(fetchNewsError());
    }
  }).catch(() => {
    dispatch(fetchNewsError());
  }).then(() => {
    dispatch(fetchNewsFinish());
  });
};

export const refreshNews = () => (dispatch) => {
  dispatch(fetchNewsStart());
  dispatch(clearNewsData());
  dispatch(fetchNews(1));
};

export const updateSearchKeyword = e => ({
  type: types.UPDATE_SEARCH_KEYWORD,
  keyword: e.target.value
});
