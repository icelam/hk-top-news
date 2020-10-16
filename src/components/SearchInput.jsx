import React from 'react';
import PropTypes from 'prop-types';
import { fade, makeStyles } from '@material-ui/core/styles';

/* Material UI Components */
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
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
    color: 'inherit',
    [theme.breakpoints.only('xs')]: {
      width: '100%'
    }
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

const SearchInput = ({ onSearch, searchValue, className }) => {
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
        onChange={onSearch}
        value={searchValue}
      />
    </div>
  );
};

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  className: PropTypes.string
};

SearchInput.defaultProps = {
  className: ''
};

export default SearchInput;
