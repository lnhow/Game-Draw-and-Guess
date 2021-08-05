import { Redirect, Route, Switch } from 'react-router-dom';
import ErrorPage from '../error';
import SignUp from '../../components/signUp/signUp';
import Login from '../../components/login/login';
import Room from '../../components/room/room';
import RoomCreate from '../room/create';
import RoomSingle from '../room/single';
import HomeLogin from '../home/homeloggin';
import { useSelector } from 'react-redux';

import Home from '../../layouts/home';

export default function Router() {
  const User = useSelector((state) => state.user);
  const UserIsLogin = localStorage.getItem('isLogin');
  return (
    <Switch>
      <Route exact path="/login">
        {User.isLogin ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route exact path="/sign-up">
        {User.isLogin ? <Redirect to="/" /> : <SignUp />}
      </Route>
      <Route exact path="/" component={Home} />
      <Route exact path="/home">
        <HomeLogin />
      </Route>
      <Route exact path="/room">
        <Room />
      </Route>
      <Route exact path="/room/create">
        {User.isLogin ? <RoomCreate /> : <Redirect to="/login" />}
      </Route>
      <Route path="/room/:id">
        {UserIsLogin ? <RoomSingle /> : <Redirect to="/login" />}
      </Route>
      <Route>
        <ErrorPage errorCode={404} message={'Not Found'} />
      </Route>
    </Switch>
  );
}
