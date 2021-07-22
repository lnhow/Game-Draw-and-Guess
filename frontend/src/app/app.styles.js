import { createTheme } from '@material-ui/core';

export default createTheme({
  typography: {
    h5: {
      fontFamily: '"Gorditas", cursive',
    },
    h6: {
      fontFamily: '"Fredoka One", cursive',
    },
  },
  palette: {
    background: {
      default: '#EDEDED',
      accent: 'rgba(255,255,255,0.8)',
    },
  },
});
