import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import forceHttps from '@utils/forceHttps';

/* Material UI Components */
import Grid from '@material-ui/core/Grid';

/* Cpmponents */
import Loading from '@components/Loading';
import NewsCard from '@components/NewsCard';
import ErrorMessage from '@components/ErrorMessage';

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: `${theme.spacing(11)}px 0 ${theme.spacing(3)}px 0`,
    [theme.breakpoints.only('xs')]: {
      padding: `${theme.spacing(9)}px 0 ${theme.spacing(3)}px 0`
    }
  }
}));

const NewsFeed = ({ actions, pageLoading, newsArticles, fetchError }) => {
  const classes = useStyles();

  useEffect(() => {
    actions.fetchNews();
  }, []);

  // Fetching News
  if (pageLoading) {
    return <Loading />;
  }

  // Fetch finished and API results contains atricles key
  if (!fetchError) {
    // At least 1 article
    if (newsArticles.length) {
      return (
        <div className={classes.wrapper}>
          <Grid container spacing={2}>
            {
              newsArticles.map(a => (
                <Grid key={a.url} item xs={12} sm={6} md={4} lg={4}>
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

NewsFeed.propTypes = {
  actions: PropTypes.object.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  newsArticles: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string,
    content: PropTypes.string,
    description: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    source: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired
    }),
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    urlToImage: PropTypes.string
  })).isRequired,
  fetchError: PropTypes.bool.isRequired
};

export default NewsFeed;
