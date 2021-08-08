import {
  Container,
  Divider,
  Grid,
  Typography,
  Paper,
  CssBaseline,
} from '@material-ui/core';
import { FuncButton } from '../../common/Button.js';
import Input from '../../common/inputVer1/input';
import Footer from '../../components/footer/index.js';
import WelcomeBanner from '../../components/banner/welcomeBanner.js';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 0),
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    marginLeft: theme.spacing(40),
    marginRight: theme.spacing(20),
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    justify: 'center',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(10),
    width: '300px',
  },
  description: {
    fontFamily: '"Fredoka One", cursive',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  divider: {
    marginLeft: theme.spacing(5),
    width: '4px',
  },
  text: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: '22px',
    color: '#616161',
    textAlign: 'center',
  },
  img: {
    border: '4px solid #616161',
    backgroundColor: 'white',
    borderRadius: '50px',
    padding: '5px',
    width: '168px',
    height: '168px',
  },
}));

function Home() {
  const classes = useStyles();
  const [idRoom, setIdRoom] = useState('');
  const User = useSelector((state) => state.user);
  const user = {
    idLogin: User.isLogin,
    name: User.username,
    avatar: User.avatar,
  };

  return (
    <Container component="main" className={classes.root}>
      <CssBaseline />
      <WelcomeBanner />

      <div>
        <div className={classes.container}>
          {user.idLogin ? (
            <Grid>
              <img src={User.avatar} alt="avatar" className={classes.img} />
              <Typography variant="h6" className={classes.text}>
                Hello, {User.username}
              </Typography>
            </Grid>
          ) : (
            <Grid>
              <Typography variant="h6" className={classes.text}>
                Don't have an account?
              </Typography>
              <FuncButton
                link="/sign-up"
                text="Sign up"
                bgcolor="#028a0f"
              ></FuncButton>
              <Typography variant="h6" className={classes.text}>
                Already have an account?
              </Typography>
              <FuncButton link="/login" text="Log in"></FuncButton>
            </Grid>
          )}
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
                  value={idRoom}
                  handleChange={(e) => setIdRoom(e.target.value)}
                  placeholder="Enter room code"
                  link={`/room/${idRoom}`}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>

      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Container>
  );
}

export default Home;
