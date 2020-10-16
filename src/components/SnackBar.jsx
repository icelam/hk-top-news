import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

/* Material UI Components */
import Button from '@material-ui/core/Button';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    'box-sizing': 'border-box'
  },
  snackbar: {
    borderRadius: 0
  }
});

const SnackBar = ({ message, buttonText, buttonAction }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SnackbarContent
        open
        className={classes.snackbar}
        message={message}
        action={
          (
            <Button color="secondary" onClick={buttonAction}>
              {buttonText}
            </Button>
          )
        }
      />
    </div>
  );
};

SnackBar.propTypes = {
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonAction: PropTypes.func.isRequired
};

export default SnackBar;
