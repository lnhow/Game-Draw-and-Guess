import { Paper, Typography, Box } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

import useStyles from './styles';

export default function GameStartingScreen() {
  const classes = useStyles();

  return (
    <Paper className={classes.waiting} elevation={2}>
      <Box className={classes.contentWaiting}>
        <Typography className={classes.contentItem} variant="h5">
          The game is starting
        </Typography>
        <CircularProgress color="secondary" />
      </Box>
    </Paper>
  );
}
