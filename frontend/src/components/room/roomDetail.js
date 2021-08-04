import React from 'react';
import { Avatar, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';


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
    marginBottom: '0px',
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

const Room = ({ currentPlayer, maxPlayer, roomName, roomId, isPrivate }) => (
  <Grid item justify="center">
    <Paper className={useStyles().paper}>
    
      <div className={useStyles().avatar}>
        <Avatar
          alt="Rimy Sharp"
          src="https://icon-library.com/images/doraemon-icon/doraemon-icon-19.jpg"
        />
      </div>
      <Typography variant="h6" className={useStyles().roomName}>
        {roomName}
        <br />
        <span className={useStyles().roomId}>&emsp;#{roomId}</span>
      </Typography>
      <RoomInfo
        curPlayer={currentPlayer}
        maxiPlayer={maxPlayer}
        pvt={isPrivate}
      />
    </Paper>
  </Grid>
);

const RoomInfo = ({ curPlayer, maxiPlayer, pvt }) => (
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
    </Grid>
  </div>
);

RoomInfo.default = {
  currentPlayer: '0',
  maxPlayer: '0',
  pvt: '',
};

export default Room;
