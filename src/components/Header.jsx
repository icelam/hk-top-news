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

/* Components */
import ProgressBar from '@components/ProgressBar';
import SearchInput from '@components/SearchInput';

import logo from '@images/logo-light.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  container: {
    [theme.breakpoints.only('xs')]: {
      paddingRight: theme.spacing(1)
    }
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.only('xs')]: {
      display: 'none'
    }
  },
  logo: {
    height: theme.spacing(4),
    marginRight: theme.spacing(2)
  },
  search: {
    [theme.breakpoints.only('xs')]: {
      flexGrow: 1
    }
  },
  refreshButton: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(0.5)
  }
}));

const Header = ({
  onSearch, searchValue, refreshNews, pageLoading
}) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root}>
      <Container className={classes.container}>
        <Toolbar disableGutters>
          <img id="logo" src={logo} alt="Logo" className={classes.logo} />
          <Typography variant="h6" color="inherit" id="app-name" className={classes.title}>
            香港熱門新聞
          </Typography>

          <SearchInput
            id="search"
            className={classes.search}
            onSearch={onSearch}
            searchValue={searchValue}
          />

          <IconButton
            id="refresh"
            aria-label="refresh"
            aria-controls="menu-appbar"
            aria-haspopup="false"
            color="inherit"
            onClick={refreshNews}
            className={classes.refreshButton}
          >
            <Refresh />
          </IconButton>

        </Toolbar>
      </Container>
      {
        pageLoading ? <ProgressBar /> : null
      }
    </AppBar>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  refreshNews: PropTypes.func.isRequired,
  pageLoading: PropTypes.bool.isRequired
};

export default Header;
