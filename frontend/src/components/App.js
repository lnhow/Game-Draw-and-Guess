import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
// import { Provider } from 'react-redux';

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
  

  useEffect(()=>{
    if(tokenForUser){
      const infoUser = jwt.verify(tokenForUser, process.env.REACT_APP_TOKEN_SECRET);
      dispatch(updateUser({ isLogin:true,username: infoUser.username }));
    }
  },[tokenForUser,dispatch])

  return (
    // <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />

          <RouterApp />
        </BrowserRouter>
      </ThemeProvider>
    // </Provider>
  );
}

export default App;
