import { Paper, Typography, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';

export default function RoundStartingScreen() {
  const classes = useStyles();
  const drawerId = useSelector((state) => state.room.drawerId);
  const users = useSelector((state) => state.room.users);
  const round = useSelector((state) => state.room.roomRound);
  let drawer = users.filter((user) => user.id === drawerId);
  if (drawer) {
    //There should be only one drawer
    drawer = drawer[0];
  }

  return (
    <Paper className={classes.waiting} elevation={2}>
      <Box className={classes.contentWaiting}>
        <Typography className={classes.contentItem} variant="h5">
          Round{round ? ` ${round} ` : ' '}started
        </Typography>
        <Typography className={classes.contentItem} variant="body1">
          The drawer is
        </Typography>
        <Typography className={classes.contentItem} variant="h5">
          {drawer.username}
        </Typography>
      </Box>
    </Paper>
  );
}
