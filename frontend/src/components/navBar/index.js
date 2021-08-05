import { Typography, AppBar, Toolbar, Button, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles.js';
import ProfileMenu from './profileMenu';
import { useSelector } from 'react-redux';

function Navbar() {
  const User = useSelector((state) => state.user);
  console.log('Username: ', User);
  const classes = useStyles();
  const user = {
    idLogin: User.isLogin,
    name: User.username,
    avatar: User.avatar,
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
        variant="h4"
      >
        Draw &amp; Guess
      </Typography>
    </Toolbar>
  );
}

function UserToolbar({ classes, user }) {
  return (
    <Toolbar className={classes.toolbar}>
      {user.idLogin ? (
        <ProfileMenu
          component={
            <>
              <Avatar
                className={classes.avatar}
                alt={user.name}
                src={user.avatar}
              ></Avatar>
              <Typography className={classes.heading} variant="body2">
                {user.name}
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
