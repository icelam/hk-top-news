import axios from 'axios';

// API Specification: https://newsapi.org/docs/endpoints/top-headlines
const getNews = () => axios.get('https://pinkylam.me/playground/hk-top-news/api/news', {
  params: {
    country: 'hk',
    category: 'general',
    pageSize: 100
  }
});

export default getNews;
