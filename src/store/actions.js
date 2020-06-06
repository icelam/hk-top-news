import getNews from '@services/newsService';
import * as types from './types';

export const fetchNewsStart = () => ({
  type: types.FETCH_NEWS_START,
  pageLoading: true
});

export const fetchNewsFinish = () => ({
  type: types.FETCH_NEWS_FINISH,
  pageLoading: false
});

export const fetchNewsError = () => ({
  type: types.FETCH_NEWS_ERROR,
  fetchError: true
});

export const updateNewsData = (articles) => ({
  type: types.UPDATE_NEWS_DATA,
  newsArticles: articles,
  fetchError: false
});

export const clearNewsData = () => ({
  type: types.CLEAR_NEWS_DATA
});

export const fetchNews = () => (dispatch) => {
  getNews().then(({ data }) => {
    if (typeof data === 'object' && Object.prototype.hasOwnProperty.call(data, 'articles')) {
      dispatch(updateNewsData(data.articles));
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
  dispatch(fetchNews());
};
