import {
  Container,
  Divider,
  Grid,
  Typography,
  Button,
  Paper,
  TextField,
  IconButton,
  CssBaseline,
} from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';

import Footer from '../../components/footer/index.js';
// import useStyles from './styles.js';

import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 0),
  },
  navbarTitle: {
    textDecoration: 'none',
    color: 'blue',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    marginLeft: theme.spacing(40),
    marginRight: theme.spacing(20),
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(10),
  },
  welcome: {
    fontFamily: '"Gorditas", cursive',
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
  },
  description: {
    fontFamily: '"Fredoka One", cursive',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  icon: {
    marginLeft: '-60px',
    marginTop: '20px',
  },
  input: {
    width: '90%',
  },
  divider: {
    marginLeft: theme.spacing(5),
    width: '4px',
  },
  span: {
    color: 'white',
    textShadow: '-1px 0 black, 0 1px black, 2px 0 black, 0 -1px black',
  },
  text: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: '22px',
    color: '#616161',
    textAlign: 'initial',
  },
}));

const LoginButton = withStyles({
  root: {
    color: 'white',
    marginBottom: '40px',
    marginTop: '10px',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 18,
    padding: '6px 40px',
    border: '4px solid #001B4D',
    borderRadius: '25px',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    fontFamily: '"Gorditas", cursive',
    '&:hover': {
      backgroundColor: '#0069d9',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0rem rgba(0,123,255,.5)',
    },
  },
})(Button);

const SignupButton = {
  backgroundColor: '#03AC13',
  '&:hover': {
    backgroundColor: '#028a0f',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#028a0f',
    borderColor: '#5dbb63',
  },
  '&:focus': {
    boxShadow: '0 0 0 0rem rgba(0,123,255,.5)',
  },
};

const intro = {
  color: '#FFA500',
  weight: '400',
  fontSize: 30,
  textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
};

const gameName = {
  fontSize: '40px',
  color: '#800080',
};

function Home() {
  const classes = useStyles();

  return (
    <Container component="main" className={classes.root}>
      <CssBaseline />
      {/* <Grid container spacing={2}>
        <Typography variant="h5" className={classes.welcome}>
          WELCOME TO DRAW &amp; GUESS
        </Typography>
        <Typography variant="h6" className={classes.description}>
          A massively multiplayer free to play pictionary game!
        </Typography> */}
      <div>
        <Typography variant="h5" className={classes.welcome} style={gameName}>
          WELCOME TO <span className={classes.span}>DRAW&amp;GUESS</span>
        </Typography>
        <Typography variant="h6" className={classes.description} style={intro}>
          A massively multiplayer free to play pictionary game!
        </Typography>
      </div>

      <div>
        <div className={classes.container}>
          <Grid item>
            <Typography variant="h6" className={classes.text}>
              Don't have an account?
            </Typography>
            {/* <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/sign-up"
          >
            Sign up
          </Button> */}
            <LoginButton
              href="/signup"
              variant="contained"
              className={classes.margin}
              style={SignupButton}
            >
              Sign up
            </LoginButton>
            <Typography variant="h6" className={classes.text}>
              Already have an account?
            </Typography>
            {/* <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/login"
          >
            Log in
          </Button> */}
            <LoginButton
              href="/login"
              variant="contained"
              disableRipple
              className={classes.margin}
            >
              Log in
            </LoginButton>
          </Grid>
          <Divider
            className={classes.divider}
            orientation="vertical"
            flexItem
          />

          <Grid item>
            <div>
              <Paper className={classes.paper}>
                <Typography variant="h6" className={classes.description}>
                  Easy to play
                </Typography>
                <Typography variant="h6">Game rule .....</Typography>
              </Paper>
              <NumberInput id="roomId" name="roomId" classes={classes} />
            </div>
          </Grid>
        </div>
      </div>
      <Grid item xs="12">
        <Footer />
      </Grid>
      {/* </Grid> */}
    </Container>
  );
}

function NumberInput({ id, name, classes }) {
  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">Join as Guest</Typography>
      <TextField
        variant="outlined"
        fullWidth
        id={id}
        placeholder="Enter room code"
        name={name}
        type="text"
        InputProps={
          //Props applied to the <Input/> element of material UI
          {
            endAdornment: (
              <IconButton type="submit" aria-label="Join Roon">
                <ExitToApp />
              </IconButton>
            ),
          }
        }
      />
    </Paper>
  );
}

export default Home;
