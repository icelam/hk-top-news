import newsReducer from '../reducers';
import * as types from '../types';
import initialState from '../states';
import mockedNewsResponse from './mockedResponse/news.json';

describe('Page reducer', () => {
  it('should return initial state', () => {
    expect(newsReducer(undefined, {})).toEqual(initialState);
  });

  it('should change page loading flag when starting to fetch news', () => {
    const expectedNewData = { pageLoading: true };
    const expectedAction = { type: types.FETCH_NEWS_START, ...expectedNewData };
    const expectedState = { ...initialState, ...expectedNewData };
    expect(newsReducer(initialState, expectedAction)).toEqual(expectedState);
  });

  it('should change page loading flag when finish fetching news', () => {
    const expectedNewData = { pageLoading: false };
    const expectedAction = { type: types.FETCH_NEWS_FINISH, ...expectedNewData };
    const expectedState = { ...initialState, ...expectedNewData };
    expect(newsReducer(initialState, expectedAction)).toEqual(expectedState);
  });

  it('should change error flag when failed to fetch news', () => {
    const expectedNewData = { fetchError: true };
    const expectedAction = { type: types.FETCH_NEWS_ERROR, ...expectedNewData };
    const expectedState = { ...initialState, ...expectedNewData };
    expect(newsReducer(initialState, expectedAction)).toEqual(expectedState);
  });

  it('should append newly fetched news to store', () => {
    const expectedNewData = {
      newsArticles: mockedNewsResponse.articles,
      fetchError: false
    };
    const expectedAction = { type: types.UPDATE_NEWS_DATA, ...expectedNewData };
    const expectedState = { ...initialState, ...expectedNewData };
    expect(newsReducer(initialState, expectedAction)).toEqual(expectedState);

    // Mock second fetch
    const expectedStateAfterSecondFetch = {
      ...expectedState,
      newsArticles: [...expectedState.newsArticles, ...mockedNewsResponse.articles]
    };
    expect(newsReducer(expectedState, expectedAction)).toEqual(expectedStateAfterSecondFetch);
  });

  it('should clear news in store', () => {
    const expectedNewData = {
      newsArticles: [],
      pagination: 1
    };
    const expectedAction = { type: types.CLEAR_NEWS_DATA, ...expectedNewData };
    const expectedState = { ...initialState, ...expectedNewData };
    expect(newsReducer(initialState, expectedAction)).toEqual(expectedState);
  });

  it('should update pagination', () => {
    const expectedNewData = {
      pagination: 2
    };
    const expectedAction = { type: types.UPDATE_PAGINATION, ...expectedNewData };
    const expectedState = { ...initialState, ...expectedNewData };
    expect(newsReducer(initialState, expectedAction)).toEqual(expectedState);
  });

  it('should update search keyword', () => {
    const expectedNewData = {
      keyword: '香港'
    };
    const expectedAction = { type: types.UPDATE_SEARCH_KEYWORD, ...expectedNewData };
    const expectedState = { ...initialState, ...expectedNewData };
    expect(newsReducer(initialState, expectedAction)).toEqual(expectedState);
  });

  it('should update total page', () => {
    const expectedNewData = {
      totalPage: 13
    };
    const expectedAction = { type: types.UPDATE_TOTAL_PAGE, ...expectedNewData };
    const expectedState = { ...initialState, ...expectedNewData };
    expect(newsReducer(initialState, expectedAction)).toEqual(expectedState);
  });
});
