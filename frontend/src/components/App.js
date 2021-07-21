import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';

import Navbar from './navBar';
import RouterApp from '../layouts/router/index';

import store from '../redux/store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <RouterApp />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
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
