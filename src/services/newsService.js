import axios from 'axios';

const getNews = () => axios.get('https://newsapi.org/v2/top-headlines', {
  params: {
    apiKey: process.env.REACT_APP_NEWS_API_KEY,
    country: 'hk'
  }
});

export default getNews;
