import { Paper, Typography, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';

import useStyles from './styles';

export default function RoundEndScreen() {
  const classes = useStyles();
  const wordLastRound = useSelector((state) => state.room.wordLastRound);
  const round = useSelector((state) => state.room.roomRound);

  return (
    <Paper className={classes.waiting} elevation={2}>
      <Box className={classes.contentWaiting}>
        <Typography className={classes.contentItem} variant="h5">
          Round{round ? ` ${round} ` : ' '}ended
        </Typography>
        <Typography className={classes.contentItem} variant="body1">
          The word is
        </Typography>
        <Typography className={classes.contentItem} variant="h5">
          {wordLastRound}
        </Typography>
      </Box>
    </Paper>
  );
}
