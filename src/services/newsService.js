import axios from 'axios';

// API Specification: https://newsapi.org/docs/endpoints/top-headlines
const getNews = () => axios.get('https://newsapi.org/v2/top-headlines', {
  params: {
    apiKey: process.env.REACT_APP_NEWS_API_KEY,
    country: 'hk',
    category: 'general',
    pageSize: 100
  }
});

export default getNews;
