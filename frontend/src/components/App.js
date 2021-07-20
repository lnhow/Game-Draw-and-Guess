import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

import Home from '../containers/home';
import Auth from './auth';
import NotFound from './notFound';
import Navbar from './navBar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login">
            <Auth isSignupMode={false} />
          </Route>
          <Route exact path="/signup">
            <Auth isSignupMode={true} />
          </Route>
          <Route component={NotFound} />
        </Switch>
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
