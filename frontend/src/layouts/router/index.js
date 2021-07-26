import { Route, Switch } from 'react-router-dom';
import ErrorPage from '../error';
import SignUp from '../../components/signUp/signUp';
import Login from '../../components/login/login';
import Home from '../../layouts/home';

export default function router() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/sign-up">
        <SignUp />
      </Route>
      <Route path="/home">
            <HomepageLogin />
          </Route>
      <Route>
        <ErrorPage errorCode={404} message={'Not Found'} />
      </Route>
      
    </Switch>
  );
}

function HomepageLogin() {
  return <h2>Home</h2>;
}
