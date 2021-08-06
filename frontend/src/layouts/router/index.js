import { Route, Switch } from 'react-router-dom';
import ErrorPage from '../error';
import SignUp from '../../components/signUp/signUp';
import Login from '../../components/login/login';
import Room from '../../components/room/room';
import RoomCreate from '../room/create';
import RoomSingle from '../room/single';
import { useSelector } from 'react-redux';
import Profile from '../../components/profile/userProfile';
import ProfileEdit from '../../components/profile/editProfile';
import Home from '../../layouts/home';

export default function Router() {
  const User = useSelector((state) => state.user);
  return (
    <Switch>
      <Route exact path="/login">
        {User.isLogin ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route exact path="/sign-up">
        {User.isLogin ? <Redirect to="/" /> : <SignUp />}
      </Route>
      <Route exact path="/" component={Home} />
      <Route exact path="/room">
        <Room />
      </Route>
      <Route exact path="/room/create">
        {User.isLogin ? <RoomCreate /> : <Redirect to="/login" />}
      </Route>
      <Route path="/room/:id">
        {User.isToken ? <RoomSingle /> : <Redirect to="/login" />}
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/edit">
        <ProfileEdit />
      </Route>
      <Route>
        <ErrorPage errorCode={404} message={'Not Found'} />
      </Route>
    </Switch>
  );
}
