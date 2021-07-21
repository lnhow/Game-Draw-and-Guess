import { Route, Switch } from 'react-router-dom';
import ErrorPage from '../error';
import Auth from '../../components/auth';
// import SignUp from '../../components/signUp/signUp';
// import Login from '../../components/login/login';
import Home from '../../layouts/home';

export default function router() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login">
        <Auth isSignupMode={false} />
      </Route>
      <Route exact path="/signup">
        <Auth isSignupMode={true} />
      </Route>
      <Route>
        <ErrorPage errorCode={404} message={'Not Found'} />
      </Route>
    </Switch>
  );
}
