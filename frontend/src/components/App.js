import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

import Navbar from './navBar';
import RouterApp from '../layouts/router/index'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />

        <RouterApp/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const theme = createTheme({
  typography: {
    h5: {
      fontFamily: '"Gorditas", cursive',
    },
    h6: {
      fontFamily: '"Fredoka One", cursive',
    },
  },
});

export default App;
