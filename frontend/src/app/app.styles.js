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
    primary: {
      main: '#311b92',
    },
    secondary: {
      main: '#800080',
    },
    background: {
      default: '#EDEDED',
      accent: 'rgba(255,255,255,0.8)',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundImage: 'url("/static/background.svg")',
          /* background by SVGBackgrounds.com */
        },
        '*::-webkit-scrollbar': {
          width: '0.6rem',
          height: '0.6rem',
        },
        '*::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '*::-webkit-scrollbar-thumb': {
          borderRadius: '5px',
          backgroundColor: 'rgba(0,0,0,0.3)',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
      },
    },
  },
});
