import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { formatDate } from '@utils/format';

/* Material UI Components */
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    height: '100%'
  },
  source: {
    fontSize: 14
  }
});

const NewsCard = ({
  newsSource,
  newsDate,
  newsTitle,
  newsImage,
  newsDescription,
  newsUrl
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea href={newsUrl} className={classes.card}>
        <CardHeader
          avatar={
            (
              <Avatar aria-label={newsSource}>
                {newsSource.substring(0, 1)}
              </Avatar>
            )
          }
          title={newsSource}
          subheader={formatDate(newsDate)}
        />

        {
          newsImage
            ? <CardMedia component="img" image={newsImage} title={newsTitle} />
            : null
        }

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {newsTitle}
          </Typography>

          {
            newsDescription
              ? <Typography variant="body2" color="textSecondary" component="p">{newsDescription}</Typography>
              : null
          }

        </CardContent>
      </CardActionArea>
    </Card>
  );
};

NewsCard.propTypes = {
  newsSource: PropTypes.string.isRequired,
  newsDate: PropTypes.string.isRequired,
  newsTitle: PropTypes.string.isRequired,
  newsImage: PropTypes.string,
  newsDescription: PropTypes.string,
  newsUrl: PropTypes.string.isRequired
};

NewsCard.defaultProps = {
  newsImage: null,
  newsDescription: null
};

export default NewsCard;
