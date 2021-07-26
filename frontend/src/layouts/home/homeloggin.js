import {
  Container,
  Divider,
  Grid,
  Typography,
  Paper,
  CssBaseline,
} from '@material-ui/core';
import { FuncButton } from '../../common/Button.js';
import Input from '../../components/auth/input.js';
import Footer from '../../components/footer/index.js';


import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

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
    marginLeft: theme.spacing(35),
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
    width: '300px'
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
    color: 'white',
    padding: '0px 5px',
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
  username: {
    marginLeft: theme.spacing(2),
    border: '3px solid #c1c1c1',
    padding: theme.spacing(1),
  },
}));

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

function HomeLogin() {
  const classes = useStyles();
  const User = useSelector((state) => state.user)

  return (
    <Container component="main" className={classes.root}>
      <CssBaseline />
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
          <Grid>
            <img src={User.avatar} alt="avatar" />
            <Typography variant="h6" className={classes.text}>
              Username
              <input
                type="text"
                value={User.username}
                readOnly
                className={classes.username}
              />
            </Typography>
          </Grid>
          <Divider
            className={classes.divider}
            orientation="vertical"
            flexItem
          />
          <Grid item md={7} sm={12}>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Paper className={classes.paper}>
                <Typography variant="h6" className={classes.description}>
                  Easy to play
                </Typography>
                <Typography>Game rule .....</Typography>
              </Paper>
            </Grid>
            <Grid container direction="column">
              <Paper className={classes.paper}>
                <Typography variant="h6" className={classes.description}>
                  See all available rooms
                </Typography>
                <FuncButton
                  link="/room"
                  text="Rooms"
                  bgcolor="#09f"
                  name="room"
                ></FuncButton>
              </Paper>
            </Grid>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Paper className={classes.paper}>
                <Typography variant="h6">Quick Play</Typography>
                <Input
                  id="roomId"
                  name="roomId"
                  placeholder="Enter room code"
                  link="/room/:id"
                />
                <Typography>OR</Typography>
                <FuncButton
                  link="/room/:id"
                  text="Random"
                  bgcolor="#F97645"
                  name="esport"
                ></FuncButton>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>

      <Grid item xs="12">
        <Footer />
      </Grid>
    </Container>
  );
}

export default HomeLogin;
