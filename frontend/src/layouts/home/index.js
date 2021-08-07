import { Container, Divider, Grid, Typography, Paper } from '@material-ui/core';
import { FuncButton } from '../../common/Button.js';
import Input from '../../common/inputVer1/input';
import Footer from '../../components/footer/index.js';
import { useSelector } from 'react-redux';

import useStyles from './styles.js';
import { useState } from 'react';

const intro = {
  color: '#FFA500',
  weight: '400',
  fontSize: 30,
  textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
};

const gameName = {};

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
    <Container component="main">
      <div>
        <Typography variant="h5" className={classes.welcome} style={gameName}>
          WELCOME TO <span className={classes.span}>DRAW &amp; GUESS</span>
        </Typography>
        <Typography variant="h6" className={classes.description} style={intro}>
          A massively multiplayer free to play pictionary game!
        </Typography>
      </div>

      <Grid container className={classes.container}>
        {user.idLogin ? (
          <Grid>
            <img src={User.avatar} alt="avatar" />
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
        <Divider className={classes.divider} orientation="vertical" flexItem />
        <Grid item md={7} sm={12}>
          <Grid container direction="column" alignItems="center">
            <Paper className={classes.paper}>
              <Typography variant="h6" className={classes.description}>
                Easy to play
              </Typography>
              <Typography>Game rule .....</Typography>
            </Paper>
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
      </Grid>

      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Container>
  );
}

export default Home;
