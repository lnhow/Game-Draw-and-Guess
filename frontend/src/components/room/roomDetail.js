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
    width: '220px',
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
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));

function RoomDetail() {
  const classes = useStyles();

  return (
    <Grid item xs={3} justify="center">
      <Paper className={classes.paper}>
        <div className={classes.avatar}>
          <Avatar
            alt="Remy Sharp"
            src="https://icon-library.com/images/doraemon-icon/doraemon-icon-19.jpg"
          />
        </div>
        <Typography variant="h6" className={classes.roomName}>
          roomName
          <span className={classes.roomId}>&emsp;#roomId</span>
        </Typography>
        <RoomSetting />
      </Paper>
    </Grid>
  );
}

function RoomSetting() {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs>
        <Paper className={classes.setting}>
          <IconButton className={classes.icon}>
            <PersonIcon />
          </IconButton>
          <Typography>10/10</Typography>
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper className={classes.setting}>
          <IconButton className={classes.icon}>
            <LanguageIcon />
          </IconButton>
          <Typography>EN</Typography>
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper className={classes.setting}>
          <IconButton className={classes.icon}>
            <EmojiEventsIcon />
          </IconButton>
          <Typography>120</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default RoomDetail;
