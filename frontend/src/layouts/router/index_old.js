import { Redirect, Route, Switch } from 'react-router-dom';
import ErrorPage from '../error';
import SignUp from '../../components/signUp/signUp';
import Login from '../../components/login/login';
import Room from '../../components/room/room';
import RoomCreate from '../room/create';
import RoomSingle from '../room/single';
import HomeLogin from '../home/homeloggin';
import { useSelector } from 'react-redux';
import Profile from '../../components/profile/userProfile';
import ProfileEdit from '../../components/profile/editProfile';
import Home from '../../layouts/home';

export default function Router() {
  const User = useSelector((state) => state.user);
  return (
    <Switch>
      <Route path="/">
        {User.isLogin ? (
          <PagePrivate isLogin={User.isLogin} />
        ) : (
          <div>
            <Logined isLogin={User.isLogin} />
            <Route exact path="/home">
              <Redirect to="/login" />
            </Route>
          </div>
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
      <Route path="/room/:id">
        <RoomSingle />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/edit">
        <ProfileEdit />
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
