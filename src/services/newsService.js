import axios from 'axios';

// API Specification: https://newsapi.org/docs/endpoints/top-headlines
const getNews = (page, pageSize = 10, keyword = '') => axios.get('https://pinkylam.me/playground/hk-top-news/api/news', {
  params: {
    country: 'hk',
    category: 'general',
    q: keyword,
    pageSize,
    page
  }
});

export default getNews;
