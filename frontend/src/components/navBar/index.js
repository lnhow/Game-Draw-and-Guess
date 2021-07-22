import { Typography, AppBar, Toolbar, Button, Avatar } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useStyles from './styles.js';
import ProfileMenu from './profileMenu';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import { LOGOUT } from '../../redux/actions/types';

function Navbar() {
  const classes = useStyles();
  //const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  // const logout = () => {
  //   dispatch({ type: LOGOUT });

  //   history.push('/auth');

  //   setUser(null);
  // };

  useEffect(() => {
    // const token = user?.token;
    // if (token) {
    //   const decodedToken = decode(token);
    //   if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    // }
    //setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const user = {
    result: {
      name: 'asffgg',
    },
  };

  return (
    <header>
      <AppBar variant="outlined" position="static" className={classes.appBar}>
        <NavbarTitle classes={classes} />
        <UserToolbar classes={classes} user={user} />
      </AppBar>
    </header>
  );
}

function NavbarTitle({ classes }) {
  return (
    <Toolbar>
      <Typography
        className={classes.heading}
        component={Link}
        to="/"
        variant="h6"
      >
        Draw &amp; Guess
      </Typography>
    </Toolbar>
  );
}

function UserToolbar({ classes, user }) {
  return (
    <Toolbar className={classes.toolbar}>
      {user.result ? (
        <ProfileMenu
          component={
            <>
              <Avatar
                className={classes.avatar}
                alt={user.result.name}
                src={user.result.imageUrl}
              >
                {user.result.name.charAt(0)}
              </Avatar>
              <Typography className={classes.heading} variant="body2">
                {user.result.name}
              </Typography>
            </>
          }
        />
      ) : (
        <Button component={Link} to="/login" variant="outlined">
          Login
        </Button>
      )}
    </Toolbar>
  );
}

export default Navbar;
