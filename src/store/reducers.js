import * as types from './types';
import initialState from './states';

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_NEWS_FINISH:
    case types.FETCH_NEWS_START:
      return Object.assign({}, state, {
        pageLoading: action.pageLoading
      });
    case types.FETCH_NEWS_ERROR:
      return Object.assign({}, state, {
        fetchError: action.fetchError
      });
    case types.UPDATE_NEWS_DATA:
      return Object.assign({}, state, {
        newsArticles: [...state.newsArticles, ...action.newsArticles]
      });
    case types.CLEAR_NEWS_DATA:
      return Object.assign({}, state, {
        newsArticles: action.newsArticles,
        pagination: action.pagination
      });
    case types.UPDATE_PAGINATION:
      return Object.assign({}, state, {
        pagination: action.pagination
      });
    case types.UPDATE_SEARCH_KEYWORD:
      return Object.assign({}, state, {
        keyword: action.keyword
      });
    default:
      return state;
  }
};
