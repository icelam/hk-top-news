import React from 'react';
import PropTypes from 'prop-types';
import { fade, makeStyles } from '@material-ui/core/styles';

/* Material UI Components */
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    margin: 0
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '200px',
    [theme.breakpoints.only('xs')]: {
      width: '100%'
    }
  }
}));

const Header = ({ actions, className }) => {
  const classes = useStyles();

  return (
    <div className={`${classes.search} ${className}`}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="搜尋"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={actions.updateSearchKeyword}
        onKeyUp={actions.updateSearchKeyword}
        onBlur={actions.updateSearchKeyword}
      />
    </div>
  );
};

Header.propTypes = {
  actions: PropTypes.object.isRequired,
  className: PropTypes.string
};

Header.defaultProps = {
  className: ''
};

export default Header;
