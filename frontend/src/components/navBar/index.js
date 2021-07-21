import { Typography, AppBar, Toolbar, Button, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles.js';
import ProfileMenu from './profileMenu';

function Navbar() {
  const classes = useStyles();
  const user = {
    // result: {
    //   name: 'Username',
    // },
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
