import React from 'react';
import { Paper, Typography, Box, Tooltip, Button } from '@material-ui/core';
import { Category, Person, Games } from '@material-ui/icons';
import useStyles from './styles';

function RoomListItem({
  roomId,
  currentPlayer,
  maxPlayer,
  roomName,
  categoryName,
  isPrivate,
  roomStatus,
  onClick,
}) {
  const classes = useStyles();
  return (
    <Paper elevation={1}>
      <Button className={classes.button} onClick={onClick}>
        <Box className={classes.container}>
          <Box>
            <Typography variant="body2">
              <b>Room</b>
            </Typography>
            <Typography variant="body2" className={classes.roomId}>
              {`#${roomId}`}
            </Typography>
            <Typography variant="h6" className={classes.roomName}>
              <b>{roomName}</b>
            </Typography>
          </Box>
          <RoomInfo
            categoryName={categoryName}
            curPlayer={currentPlayer}
            maxPlayer={maxPlayer}
            isPrivate={isPrivate}
            roomStatus={roomStatus}
          />
        </Box>
      </Button>
    </Paper>
  );
}

function RoomInfo({
  categoryName = '_',
  curPlayer = '_',
  maxPlayer = '_',
  roomStatus = '_',
  isPrivate = false,
}) {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      flexDirection="row"
      className={classes.setting}
    >
      <Tooltip title="Room category">
        <Typography variant="body1" className={classes.verticalCenter}>
          <Category />
          <span>{categoryName}</span>
        </Typography>
      </Tooltip>
      <Tooltip title="Players">
        <Typography variant="body1" className={classes.verticalCenter}>
          <Person />
          <span>{`${curPlayer}/${maxPlayer}`}</span>
        </Typography>
      </Tooltip>
      <Tooltip
        title={
          <>
            <p>Room state</p>
            <ul className={classes.plainList}>
              <li>
                <b>CREATED</b> - Room created, host have to join before everyone
                else can join
              </li>
              <li>
                <b>WAITING</b> - Room host joined, everyone else can join
              </li>
              <li>
                <b>PLAYING</b> - Room is playing, no one else can join
              </li>
              <li>
                <b>ENDED</b> - This game room had ended, no one can join
              </li>
            </ul>
          </>
        }
      >
        <Typography variant="body1" className={classes.verticalCenter}>
          <Games />
          <span>{`${roomStatus}`}</span>
        </Typography>
      </Tooltip>
    </Box>
  );
}

export default RoomListItem;
