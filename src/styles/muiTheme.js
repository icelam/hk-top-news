import { createMuiTheme } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

const breakpoints = createBreakpoints({});

const muiTheme = createMuiTheme({
  mixins: {
    toolbar: {
      minHeight: 56,
      [breakpoints.up('sm')]: {
        minHeight: 64
      }
    }
  },
  palette: {
    primary: {
      light: '#ff5c5c',
      main: '#cc2132',
      dark: '#93000c',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000000'
    }
  }
});

export default muiTheme;
