import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

/* Material UI Components */
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
/* import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';

const RefreshIcon = () => (
  <IconButton aria-label="Refresh" aria-controls="menu-appbar" aria-haspopup="false" color="inherit">
    <Refresh />
  </IconButton>
); */

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
});

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.root}>
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h6" color="inherit" className={classes.title}>
            香港熱門新聞
          </Typography>
        </Toolbar>
        {/* To-do: Refresh news */}
      </Container>
    </AppBar>
  );
};

export default Header;
