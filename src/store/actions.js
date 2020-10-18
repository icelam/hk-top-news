import getNews from '@services/newsService';
import * as types from './types';

const PAGE_SIZE = 10;

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
  type: types.CLEAR_NEWS_DATA,
  newsArticles: [],
  pagination: 1
});

export const updatePagination = (page) => ({
  type: types.UPDATE_PAGINATION,
  pagination: page
});

export const updateTotalPage = (totalPage) => ({
  type: types.UPDATE_TOTAL_PAGE,
  totalPage
});

export const updateSearchKeyword = (keyword) => ({
  type: types.UPDATE_SEARCH_KEYWORD,
  keyword
});

export const fetchNews = () => async (dispatch, getState) => {
  dispatch(fetchNewsStart());

  const { pagination, keyword } = getState();

  try {
    const { data } = await getNews(pagination, PAGE_SIZE, keyword);

    if (data.status !== 'ok') {
      throw new Error(data.message);
    }

    const totalPage = Math.ceil(data.totalResults / PAGE_SIZE);
    dispatch(updateNewsData(data.articles));
    dispatch(updateTotalPage(totalPage));
  } catch (error) {
    // console.error(error.message || 'Unknown error');
    dispatch(fetchNewsError());
  } finally {
    dispatch(fetchNewsFinish());
  }
};

export const fetchFirstPageNews = () => async (dispatch) => {
  dispatch(updatePagination(1));
  await dispatch(fetchNews());
};

export const fetchNextPageNews = () => async (dispatch, getState) => {
  const { pagination } = getState();
  dispatch(updatePagination(pagination + 1));
  await dispatch(fetchNews());
};

export const refreshNews = () => async (dispatch) => {
  dispatch(clearNewsData());
  await dispatch(fetchNews());
};

export const fetchNewsWithKeyword = (searchKeyword) => async (dispatch) => {
  dispatch(updateSearchKeyword(searchKeyword));
  dispatch(clearNewsData());
  await dispatch(fetchNews());
};
