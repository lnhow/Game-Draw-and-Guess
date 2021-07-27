import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
// import { Provider } from 'react-redux';

import Navbar from './navBar';
import RouterApp from '../layouts/router/index';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../features/User/userSlice.js';


import theme from '../app/app.styles';


function App() {

  const [cookies] = useCookies(['cookie-name']);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(cookies.user){
      dispatch(updateUser({ isLogin:true,username: cookies.user.username }))
    }
  },[cookies.user,dispatch])

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
