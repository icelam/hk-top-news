import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as newsAction from '../actions';
import * as types from '../types';
import initialState from '../states';

import getNews from '../../services/newsService';
import mockedNewsResponse from './mockedResponse/news.json';
import mockedErrorResponse from './mockedResponse/error.json';

// Mock news service
jest.mock('../../services/newsService');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore(({ ...initialState }));

const expectedFetchNewsStartAction = {
  type: types.FETCH_NEWS_START,
  pageLoading: true
};

const expectedFetchNewsFinishAction = {
  type: types.FETCH_NEWS_FINISH,
  pageLoading: false
};

const expectedFetchNewsErrorAction = {
  type: types.FETCH_NEWS_ERROR,
  fetchError: true
};

const expectedUpdateNewsDataAction = {
  type: types.UPDATE_NEWS_DATA,
  newsArticles: mockedNewsResponse.articles,
  fetchError: false
};

const expectedClearNewsDataAction = {
  type: types.CLEAR_NEWS_DATA,
  newsArticles: [],
  pagination: 1
};

const expectedUpdatePaginationAction = (page) => ({
  type: types.UPDATE_PAGINATION,
  pagination: page
});

const mockedTotalPage = mockedNewsResponse.totalResults / 10;

const expectedUpdateTotalPageAction = {
  type: types.UPDATE_TOTAL_PAGE,
  totalPage: mockedTotalPage
};

const mockedKeyword = '香港';
const expectedUpdateSearchKeywordAction = {
  type: types.UPDATE_SEARCH_KEYWORD,
  keyword: mockedKeyword
};

describe('News Actions', () => {
  beforeEach(() => {
    getNews.mockResolvedValue({ data: mockedNewsResponse });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('should create an action to set page loading flag to true when starting to fetch news', async () => {
    await store.dispatch(newsAction.fetchNewsStart());
    expect(store.getActions()).toEqual([expectedFetchNewsStartAction]);
  });

  it('should create an action to set page loading flag to false when fetch news finish', async () => {
    await store.dispatch(newsAction.fetchNewsFinish());
    expect(store.getActions()).toEqual([expectedFetchNewsFinishAction]);
  });

  it('should create an action to set error flag to true when failed fetch news', async () => {
    await store.dispatch(newsAction.fetchNewsError());
    expect(store.getActions()).toEqual([expectedFetchNewsErrorAction]);
  });

  it('should create an action to store fetched articles and reset error flag', async () => {
    await store.dispatch(newsAction.updateNewsData(mockedNewsResponse.articles));
    expect(store.getActions()).toEqual([expectedUpdateNewsDataAction]);
  });

  it('should create an action to reset store articles and pagination index', async () => {
    await store.dispatch(newsAction.clearNewsData());
    expect(store.getActions()).toEqual([expectedClearNewsDataAction]);
  });

  it('should create an action to set current pagination index', async () => {
    const mockedPage = 3;
    await store.dispatch(newsAction.updatePagination(mockedPage));
    expect(store.getActions()).toEqual([expectedUpdatePaginationAction(mockedPage)]);
  });

  it('should create an action to set total page', async () => {
    await store.dispatch(newsAction.updateTotalPage(mockedTotalPage));
    expect(store.getActions()).toEqual([expectedUpdateTotalPageAction]);
  });

  it('should create an action to store search keyword', async () => {
    await store.dispatch(newsAction.updateSearchKeyword(mockedKeyword));
    expect(store.getActions()).toEqual([expectedUpdateSearchKeywordAction]);
  });

  it('should store news articles after fetch news', async () => {
    await store.dispatch(newsAction.fetchNews());
    expect(store.getActions()).toEqual([
      expectedFetchNewsStartAction,
      expectedUpdateNewsDataAction,
      expectedUpdateTotalPageAction,
      expectedFetchNewsFinishAction
    ]);
  });

  it('should not store news articles when fetch news has error', async () => {
    // temp override with an error response
    getNews.mockResolvedValueOnce({ data: mockedErrorResponse });

    await store.dispatch(newsAction.fetchNews());
    expect(store.getActions()).toEqual([
      expectedFetchNewsStartAction,
      expectedFetchNewsErrorAction,
      expectedFetchNewsFinishAction
    ]);
  });

  it('should fetch news on first page', async () => {
    await store.dispatch(newsAction.fetchFirstPageNews());
    expect(store.getActions()).toEqual([
      expectedUpdatePaginationAction(1),
      expectedFetchNewsStartAction,
      expectedUpdateNewsDataAction,
      expectedUpdateTotalPageAction,
      expectedFetchNewsFinishAction
    ]);
  });

  it('should fetch news on next page', async () => {
    await store.dispatch(newsAction.fetchNextPageNews());
    expect(store.getActions()).toEqual([
      expectedUpdatePaginationAction(2),
      expectedFetchNewsStartAction,
      expectedUpdateNewsDataAction,
      expectedUpdateTotalPageAction,
      expectedFetchNewsFinishAction
    ]);
  });

  it('should clear news data when refresh', async () => {
    await store.dispatch(newsAction.refreshNews());
    expect(store.getActions()).toEqual([
      expectedClearNewsDataAction,
      expectedFetchNewsStartAction,
      expectedUpdateNewsDataAction,
      expectedUpdateTotalPageAction,
      expectedFetchNewsFinishAction
    ]);
  });

  it('should fetch news with keyword', async () => {
    await store.dispatch(newsAction.fetchNewsWithKeyword(mockedKeyword));
    expect(store.getActions()).toEqual([
      expectedUpdateSearchKeywordAction,
      expectedClearNewsDataAction,
      expectedFetchNewsStartAction,
      expectedUpdateNewsDataAction,
      expectedUpdateTotalPageAction,
      expectedFetchNewsFinishAction
    ]);
  });
});
