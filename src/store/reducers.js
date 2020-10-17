import * as types from './types';
import initialState from './states';

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_NEWS_FINISH:
    case types.FETCH_NEWS_START:
      return {
        ...state,
        pageLoading: action.pageLoading
      };
    case types.FETCH_NEWS_ERROR:
      return {
        ...state,
        fetchError: action.fetchError
      };
    case types.UPDATE_NEWS_DATA:
      return {
        ...state,
        newsArticles: [
          ...state.newsArticles,
          ...action.newsArticles
        ],
        fetchError: action.fetchError
      };
    case types.CLEAR_NEWS_DATA:
      return {
        ...state,
        newsArticles: action.newsArticles,
        pagination: action.pagination
      };
    case types.UPDATE_PAGINATION:
      return {
        ...state,
        pagination: action.pagination
      };
    case types.UPDATE_SEARCH_KEYWORD:
      return {
        ...state,
        keyword: action.keyword
      };
    case types.UPDATE_TOTAL_PAGE:
      return {
        ...state,
        totalPage: action.totalPage
      };
    default:
      return state;
  }
};
