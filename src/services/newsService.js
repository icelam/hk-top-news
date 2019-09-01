import axios from 'axios';

// API Specification: https://newsapi.org/docs/endpoints/top-headlines
/* const getNews = () => axios.get('https://newsapi.org/v2/top-headlines', {
  params: {
    apiKey: process.env.REACT_APP_NEWS_API_KEY,
    country: 'hk',
    category: 'general',
    pageSize: 100
  }
}); */

// API Specification: https://newsapi.org/docs/endpoints/everything
// Not ready to use until we can get yahoo.com.hk and appledaily.com.hk
// OR the API support filtering by countries
const getNews = page => axios.get('https://newsapi.org/v2/everything', {
  params: {
    apiKey: process.env.REACT_APP_NEWS_API_KEY,
    language: 'zh',
    domains: 'mingpao.com,rthk.hk,hk01.com,thestandnews.com,hket.com,stheadline.com,hk.on.cc,wenweipo.com',
    // domains: 'appledaily.com,yahoo.com',
    pageSize: 10,
    page,
    sortBy: 'publishedAt'
  }
});

export default getNews;
