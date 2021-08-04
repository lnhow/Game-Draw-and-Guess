import {
  Container,
  Grid,
  GridList,
  Typography,
  IconButton,
  CssBaseline,
  GridListTile,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { Scrollbars } from 'react-custom-scrollbars';
import { FuncButton } from '../../common/Button.js';
import Input from '../../common/inputVer1/input';
import Footer from '../../components/footer/index.js';
import Room from './roomDetail.js';
import { useState, useEffect } from 'react';
import { roomData } from './roomData.js';
import { makeStyles } from '@material-ui/core/styles';
import GuessJoinRoomModal from '../../common/modal/userJoinModal.js';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '40px',
    marginTop: '30px',
  },
  gameName: {
    fontFamily: '"Gorditas", cursive',
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    whiteSpace: 'nowrap',
    fontSize: '40px',
    color: 'black',
  },
  icon: {
    color: 'white',
    padding: '0px 5px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  center: {
    display: 'table',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  grid: {
    height: '450px',
    backgroundColor: '#FEEB75',
    padding: '20px 50px',
    borderRadius: '20px',
    marginTop: '20px',
    marginBottom: '20px',
  },
}));

const back = {
  transform: 'rotate(180deg)',
  color: '#FFE203',
};

function Rooms() {
  const User = useSelector((state) => state.user);
  const user = {
    idLogin: User.isLogin,
    name: User.username,
  };

  const classes = useStyles();

  const [data, setData] = useState([]);

  const getData = () => {
    fetch('roomData.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setData(myJson);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container component="main" className={classes.root}>
      <CssBaseline />
      <div>
        <Typography variant="h5" className={classes.gameName}>
          <IconButton className={classes.icon} style={back} href="/">
            <PlayArrowIcon />
          </IconButton>
          ROOMS
          <Input
            id="roomId"
            classes={classes}
            name="search"
            placeholder="Search room"
          />
        </Typography>

        <div className={classes.grid}>
          <Scrollbars
            renderTrackHorizontal={(props) => (
              <div
                {...props}
                style={{ display: 'none' }}
                className="track-horizontal"
              />
            )}
          >
            <GridList cols={4} cellHeight={200} spacing={10}>
              {roomData.map((data, key) => {
                return (
                  <GridListTile key={key}>
                    <Room
                      key={key}
                      currentPlayer={data.currentPlayer}
                      maxPlayer={data.maxPlayer}
                      language={data.language}
                      point={data.point}
                      roomName={data.roomName}
                      roomId={data.roomId}
                    />
                  </GridListTile>
                );
              })}
            </GridList>
          </Scrollbars>
        </div>

        <div className={classes.center}>
          <Grid item>
            <FuncButton
              link="/room/create"
              text="New room"
              name="room"
              mr="30px"
            ></FuncButton>
            {user.idLogin ? (
              <FuncButton
                link="/room/:id"
                text="Play"
                bgcolor="#028a0f"
                name="esport"
              ></FuncButton>
            ) : (
              <GuessJoinRoomModal />
            )}
          </Grid>
        </div>
      </div>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Container>
  );
}

export default Rooms;
