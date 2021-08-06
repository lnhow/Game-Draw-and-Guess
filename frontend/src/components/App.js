import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import Navbar from './navBar';
import RouterApp from '../layouts/router/index';
import jwt from 'jsonwebtoken';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/User/userSlice.js';


import theme from '../app/app.styles';

function App() {
  const dispatch = useDispatch();
  const tokenForUser = localStorage.getItem('user');
  const UserIsLogin = localStorage.getItem('isLogin');

  useEffect(() => {
    if (tokenForUser) {
      const infoUser = jwt.decode(tokenForUser, { complete: true });
      dispatch(
        updateUser({
          isLogin: UserIsLogin === 'true' ? true : false, //distinguish between logged in users and Anonymous
          id: infoUser.payload.userId,
          username: infoUser.payload.username,
          isToken:true,
        }),
      );
    }
    else {
      dispatch(updateUser({ isLogin: false,isToken:false }));
    }
  }, [tokenForUser,UserIsLogin, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />

        <RouterApp />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
