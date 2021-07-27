import { Route, Switch } from 'react-router-dom';
import ErrorPage from '../error';
import SignUp from '../../components/signUp/signUp';
import Login from '../../components/login/login';
import Room from '../../components/room/room';
import RoomCreate from '../room/create';
import RoomSingle from '../room/single';
import HomeLogin from '../home/homeloggin';

import Home from '../../layouts/home';

export default function router() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/home">
        <HomeLogin />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/sign-up">
        <SignUp />
      </Route>
      <Route exact path="/room">
        <Room />
      </Route>
      <Route exact path="/room/create">
        <RoomCreate />
      </Route>
      <Route path="/room/:id">
        <RoomSingle />
      </Route>
      <Route>
        <ErrorPage errorCode={404} message={'Not Found'} />
      </Route>
    </Switch>
  );
}
