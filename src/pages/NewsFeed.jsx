import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import forceHttps from '@utils/forceHttps';

/* Material UI Components */
import Grid from '@material-ui/core/Grid';

/* Cpmponents */
import NewsCard from '@components/NewsCard';
import SnackBar from '@components/SnackBar';
import ErrorMessage from '@components/ErrorMessage';

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: `${theme.spacing(11)}px 0 ${theme.spacing(3)}px 0`,
    [theme.breakpoints.only('xs')]: {
      padding: `${theme.spacing(9)}px 0 ${theme.spacing(3)}px 0`
    }
  }
}));

const NewsFeed = ({ actions, pageLoading, pagination, newsArticles, fetchError }) => {
  const classes = useStyles();

  const [oldScrollPosition, setOldScrollPosition] = useState(0);

  // Fetch first page
  useEffect(() => {
    actions.fetchNews(pagination + 1);
  }, []);

  // Infinite scroll
  useEffect(() => {
    const onScroll = () => {
      const htmlRoot = document.documentElement;
      const htmlBody = document.body;
      const scrollPosition = (htmlRoot.scrollTop || htmlBody.scrollTop);
      const documentHeight = (htmlRoot.scrollHeight || htmlBody.scrollHeight);
      const viewportheight = htmlRoot.clientHeight;

      const scrollRemaining = documentHeight - viewportheight - scrollPosition;

      if (scrollRemaining < 500 && !pageLoading && scrollPosition > oldScrollPosition && pagination < 10) {
        actions.fetchNews(pagination + 1);
      }

      setOldScrollPosition(scrollPosition);
    };

    window.addEventListener('scroll', onScroll, false);
    return () => window.removeEventListener('scroll', onScroll, false);
  }, [pageLoading, pagination]);

  // Fetching News
  if (pageLoading && !newsArticles.length) {
    return null;
  }

  return (
    <Fragment>
      {
        // Fetch finished and API results contains at least 1 article
        newsArticles.length
          ? (
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
          )
          : <ErrorMessage message="暫時沒有新聞。" /> // No article
      }

      {
        fetchError
          ? <SnackBar message="網絡錯誤，請稍候再試。" buttonText="重試" buttonAction={() => actions.fetchNews(pagination)} />
          : null
      }
    </Fragment>
  );
};

NewsFeed.propTypes = {
  actions: PropTypes.object.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  pagination: PropTypes.number.isRequired,
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
