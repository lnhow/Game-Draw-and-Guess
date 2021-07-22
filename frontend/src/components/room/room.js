import {
  Container,
  Grid,
  GridList,
  Typography,
  Button,
  TextField,
  IconButton,
  CssBaseline,
  GridListTile,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SearchIcon from '@material-ui/icons/Search';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { Scrollbars } from 'react-custom-scrollbars';

import Footer from '../footer/index.js';
import RoomDetail from './roomDetail.js';

import { withStyles, makeStyles } from '@material-ui/core/styles';

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

const LoginButton = withStyles({
  root: {
    color: 'white',
    marginBottom: '40px',
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

const gameName = {
  fontSize: '40px',
  color: 'black',
};

const back = {
  transform: 'rotate(180deg)',
  color: '#FFE203',
};

function Room() {
  const classes = useStyles();

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
              <GridListTile className={classes.gridTile}>
                <RoomDetail />
              </GridListTile>
              <GridListTile>
                <RoomDetail />
              </GridListTile>
              <GridListTile>
                <RoomDetail />
              </GridListTile>
              <GridListTile>
                <RoomDetail />
              </GridListTile>
              <GridListTile>
                <RoomDetail />
              </GridListTile>
              <GridListTile>
                <RoomDetail />
              </GridListTile>
              <GridListTile>
                <RoomDetail />
              </GridListTile>
              <GridListTile>
                <RoomDetail />
              </GridListTile>
              <GridListTile>
                <RoomDetail />
              </GridListTile>
            </GridList>
          </Scrollbars>
        </div>

        <div className={classes.center}>
          <Grid item>
            <LoginButton
              href=""
              variant="contained"
              className={classes.margin}
              style={SignupButton}
            >
              <IconButton className={classes.icon}>
                <MeetingRoomIcon />
              </IconButton>
              New room
            </LoginButton>
            <LoginButton
              href="/room/waiting"
              variant="contained"
              disableRipple
              className={classes.margin}
            >
              <IconButton className={classes.icon}>
                <SportsEsportsIcon />
              </IconButton>
              Play
            </LoginButton>
          </Grid>
        </div>
      </div>
      <Grid item xs="12">
        <Footer />
      </Grid>
    </Container>
  );
}

function NumberInput({ id, name, classes }) {
  return (
    <TextField
      variant="outlined"
      fullWidth
      id={id}
      placeholder="Search room"
      name={name}
      type="text"
      className={classes.search}
      InputProps={
        //Props applied to the <Input/> element of material UI
        {
          endAdornment: (
            <IconButton type="submit" aria-label="Search Room" href="">
              <SearchIcon />
            </IconButton>
          ),
        }
      }
    />
  );
}

export default Room;
