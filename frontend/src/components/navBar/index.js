import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  Avatar,
  Box,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './styles.js';

function Navbar() {
  const classes = useStyles();
  const user = {
    result: {
      name: 'Username',
    },
  };

  return (
    <header>
      <AppBar variant="outlined" position="static" className={classes.appBar}>
        <Toolbar>
          <Typography
            className={classes.heading}
            component={Link}
            to="/"
            variant="h6"
          >
            Draw & Guess
          </Typography>
        </Toolbar>
        <Toolbar className={classes.toolbar}>
          {user ? (
            <Box display="flex" flexDirection="row">
              <Box
                className={classes.profile}
                display="flex"
                flexDirection="row"
              >
                <Avatar
                  className={classes.purple}
                  alt={user.result.name}
                  src={user.result.imageUrl}
                >
                  {user.result.name.charAt(0)}
                </Avatar>
                <Typography className={classes.heading} variant="h6">
                  {user.result.name}
                </Typography>
              </Box>
              <Button variant="outlined" size="small">
                Logout
              </Button>
            </Box>
          ) : (
            <Button component={Link} to="/auth" variant="outlined">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Navbar;
