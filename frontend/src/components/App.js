import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from '../containers/home';
import Auth from './auth';
import NotFound from './notFound';
import Navbar from './navBar';

function App() {
  return (
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
  );
}

export default App;
