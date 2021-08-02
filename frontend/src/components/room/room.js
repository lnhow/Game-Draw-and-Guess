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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '40px',
    marginTop: '30px',
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
  page: {
    fontFamily: '"Gorditas", cursive',
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    color: 'black',
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
    '&:hover': {
      backgroundColor: 'transparent',
    },
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
  center: {
    display: 'table',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  margin: {
    marginRight: '40px',
    marginLeft: '40px',
  },
  search: {
    width: '30%',
    marginLeft: '550px',
    backgroundColor: 'white',
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

const gameName = {
  fontSize: '40px',
  color: 'black',
};

const back = {
  transform: 'rotate(180deg)',
  color: '#FFE203',
};

function Rooms() {
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
        <Typography variant="h5" className={classes.page} style={gameName}>
          <IconButton className={classes.icon} style={back} href="/">
            <PlayArrowIcon />
          </IconButton>
          ROOMS
          <NumberInput id="roomId" name="roomId" classes={classes} />
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
            ></FuncButton>
            <FuncButton
              link="/room/:id"
              text="Play"
              bgcolor="#028a0f"
              name="esport"
            ></FuncButton>
          </Grid>
        </div>
      </div>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Container>
  );
}

function NumberInput({ id, name, classes }) {
  return <Input name="search" placeholder="Search room" />;
}

export default Rooms;
