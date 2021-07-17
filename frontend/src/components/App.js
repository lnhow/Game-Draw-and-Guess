import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from '../containers/home';
import NotFound from './notFound';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
