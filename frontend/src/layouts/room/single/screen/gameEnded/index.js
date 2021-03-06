import { Paper, Typography, Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ListPlayer from '../../listPlayers';

import useStyles from './styles';

export default function GameEndScreen() {
  const classes = useStyles();
  //Stop leaderboard from re-render when state change
  //(State compare func always return true meaning nothing had change, no re-render)
  const players = useSelector(
    (state) => state.room.users,
    () => true,
  );
  let formattedPlayers = [...players];
  formattedPlayers = formattedPlayers.sort((p1, p2) => p2.points - p1.points);

  return (
    <Paper className={classes.outerEnd} elevation={2}>
      <Box className={classes.content}>
        <Typography className={classes.contentItem} variant="h5">
          GameOver!
        </Typography>
        <Paper className={classes.leaderboard}>
          <ListPlayer players={formattedPlayers} ordered={true} />
        </Paper>
        <Button variant="outlined" component={Link} to="/" color="primary">
          Exit game
        </Button>
      </Box>
    </Paper>
  );
}
