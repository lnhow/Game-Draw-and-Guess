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
      <Route exact path="/" component={Home} />
      <Route exact path="/room">
        <Room />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/sign-up">
        <SignUp />
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
