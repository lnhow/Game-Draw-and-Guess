import { Redirect, Route, Switch } from 'react-router-dom';
import ErrorPage from '../error';
import SignUp from '../../components/signUp/signUp';
import Login from '../../components/login/login';
import Room from '../../components/room/room';
import RoomCreate from '../room/create';
import RoomSingle from '../room/single';
import HomeLogin from '../home/homeloggin';
import { useSelector } from 'react-redux';
import HomeAdmin from '../../pages/admin/home/home';

import Home from '../../layouts/home';

export default function Router() {
  const User = useSelector((state) => state.user);
  return (
    <Switch>
      <Route path="/">
        {User.isLogin ? (
          <PagePrivate isLogin={User.isLogin} />
        ) : (
          <Logined isLogin={User.isLogin} />
        )}
      </Route>
      <Route>
        <ErrorPage errorCode={404} message={'Not Found'} />
      </Route>
    </Switch>
  );
}

function PagePrivate({ isLogin }) {
  if (!isLogin) return <Redirect to="/login" />;

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/home">
        <HomeLogin />
      </Route>
      <Route exact path="/room">
        <Room />
      </Route>
      <Route exact path="/room/create">
        <RoomCreate />
      </Route>
      <Route exact path="/admin">
        <HomeAdmin />
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

function Logined({ isLogin }) {
  if (isLogin) return <Redirect to="/home" />;
  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/sign-up">
        <SignUp />
      </Route>
      <Route>
        <ErrorPage errorCode={404} message={'Not Found'} />
      </Route>
    </Switch>
  );
}
