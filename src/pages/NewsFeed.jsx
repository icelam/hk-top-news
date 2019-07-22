import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import getNews from '@services/newsService';
import forceHttps from '@utils/forceHttps';

/* Material UI Components */
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

/* Cpmponents */
import Loading from '@components/Loading';
import NewsCard from '@components/NewsCard';
import ErrorMessage from '@components/ErrorMessage';

const useStyles = makeStyles({
  wrapper: {
    padding: '88px 0 24px 0'
  }
});

const NewsFeed = () => {
  const classes = useStyles();

  const [loading, setLoadStatus] = useState(true);
  const [apiResult, setApiResult] = useState({});
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    getNews().then(({ data }) => {
      setApiResult(data);
    }).catch(() => {
      setFetchError(true);
    }).then(() => {
      setLoadStatus(false);
    });
  }, []);

  // Fetching News
  if (loading) {
    return <Loading />;
  }

  // Fetch finished and API results contains atricles key
  if (!fetchError && typeof apiResult === 'object' && Object.prototype.hasOwnProperty.call(apiResult, 'articles')) {
    // At least 1 article
    if (apiResult.articles.length) {
      return (
        <div className={classes.wrapper}>
          <Grid container spacing={2}>
            {
              apiResult.articles.map((a, i) => (
                <Grid key={i} item xs={12} sm={6} md={4} lg={4}>
                  <NewsCard
                    newsSource={a.source.name}
                    newsDate={a.publishedAt}
                    newsTitle={a.title}
                    newsImage={typeof a.urlToImage === 'string' ? forceHttps(a.urlToImage) : a.urlToImage}
                    newsDescription={a.description}
                    newsUrl={a.url}
                  />
                </Grid>
              ))
            }
          </Grid>
        </div>
      );
    }

    // No article
    return <ErrorMessage message="暫時沒有新聞。" />;
  }

  // Error when fetching news or API results is invalid
  return <ErrorMessage message="網絡錯誤，請稍候再試。" />;
};

export default NewsFeed;
