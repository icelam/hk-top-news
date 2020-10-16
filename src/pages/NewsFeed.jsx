import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import forceHttps from '@utils/forceHttps';

/* Material UI Components */
import Grid from '@material-ui/core/Grid';

/* Cpmponents */
import NewsCard from '@components/NewsCard';
import SnackBar from '@components/SnackBar';
import ErrorMessage from '@components/ErrorMessage';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: `${theme.spacing(11)}px 0 ${theme.spacing(3)}px 0`,
    [theme.breakpoints.only('xs')]: {
      padding: `${theme.spacing(9)}px 0 ${theme.spacing(3)}px 0`
    }
  }
}));

const NewsFeed = ({
  retryFetch, pageLoading, newsArticles, fetchError
}) => {
  const classes = useStyles();

  // Fetching News
  if (pageLoading && !newsArticles.length) {
    return null;
  }

  return (
    <>
      {
        // Fetch finished and API results contains at least 1 article
        newsArticles.length
          ? (
            <div className={classes.wrapper}>
              <Grid container spacing={2}>
                {
                  newsArticles.map((article) => (
                    <Grid key={article.url} item xs={12} sm={6} md={4} lg={4}>
                      <NewsCard
                        newsSource={article.source.name}
                        newsDate={article.publishedAt}
                        newsTitle={article.title}
                        newsImage={typeof article.urlToImage === 'string' ? forceHttps(article.urlToImage) : article.urlToImage}
                        newsDescription={article.description}
                        newsUrl={article.url}
                      />
                    </Grid>
                  ))
                }
              </Grid>
            </div>
          )
          : <ErrorMessage message="沒有新聞。" /> // No article
      }

      {
        fetchError
          ? <SnackBar message="網絡錯誤，請稍候再試。" buttonText="重試" buttonAction={() => retryFetch()} />
          : null
      }
    </>
  );
};

NewsFeed.propTypes = {
  retryFetch: PropTypes.func.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  newsArticles: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string,
    content: PropTypes.string,
    description: PropTypes.string,
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

export default React.memo(NewsFeed);
