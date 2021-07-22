import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';

import Navbar from './navBar';
import RouterApp from '../layouts/router/index';

import store from '../redux/store';
import theme from '../app/app.styles';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <RouterApp />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
