import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

/* Material UI Components */
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
});

const Header = ({ actions }) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root}>
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h6" color="inherit" className={classes.title}>
            香港熱門新聞
          </Typography>
          <IconButton
            aria-label="Refresh"
            aria-controls="menu-appbar"
            aria-haspopup="false"
            color="inherit"
            onClick={actions.refreshNews}
          >
            <Refresh />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Header.propTypes = {
  actions: PropTypes.object.isRequired
};

export default Header;
