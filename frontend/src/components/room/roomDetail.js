import React from 'react';
import { Avatar, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import LanguageIcon from '@material-ui/icons/Language';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '230px',
    borderRadius: '15px',
    backgroundColor: '#FFE203',
  },
  roomId: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: '16px',
  },
  roomName: {
    marginBottom: '10px',
  },
  avatar: {
    alignItems: 'center',
    justify: 'center',
    display: 'inline-block',
  },
  setting: {
    backgroundColor: '#FFE203',
  },
  private: {
    marginLeft: '180px',
  },
  icon: {
    cursor: 'default',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

const Room = ({
  currentPlayer,
  maxPlayer,
  language,
  point,
  roomName,
  roomId,
}) => (
  <Grid item justify="center">
    <Paper className={useStyles().paper}>
      <div className={useStyles().avatar}>
        <Avatar
          alt="Remy Sharp"
          src="https://icon-library.com/images/doraemon-icon/doraemon-icon-19.jpg"
        />
      </div>
      <Typography variant="h6" className={useStyles().roomName}>
        {roomName}
        <span className={useStyles().roomId}>&emsp;#{roomId}</span>
      </Typography>
      <RoomInfo
        curPlayer={currentPlayer}
        maxiPlayer={maxPlayer}
        lang={language}
        pts={point}
      />
    </Paper>
  </Grid>
);

const RoomInfo = ({ curPlayer, maxiPlayer, lang, pts }) => (
  <div className={useStyles().div}>
    <Grid container spacing={1}>
      <Grid item xs>
        <Paper className={useStyles().setting}>
          <IconButton className={useStyles().icon}>
            <PersonIcon />
          </IconButton>
          <Typography>
            {curPlayer}/{maxiPlayer}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper className={useStyles().setting}>
          <IconButton className={useStyles().icon}>
            <LanguageIcon />
          </IconButton>
          <Typography>{lang}</Typography>
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper className={useStyles().setting}>
          <IconButton className={useStyles().icon}>
            <EmojiEventsIcon />
          </IconButton>
          <Typography>{pts}</Typography>
        </Paper>
      </Grid>
    </Grid>
  </div>
);

RoomInfo.default = {
  currentPlayer: '0',
  maxPlayer: '0',
  language: '',
  point: '',
};

export default Room;
