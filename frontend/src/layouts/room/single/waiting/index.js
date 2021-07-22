import { Paper, Typography, Button, Box } from '@material-ui/core';

import useStyles from './styles';

export default function WaitingScreen({ onStartGame }) {
  const classes = useStyles();

  return (
    <Paper className={classes.waiting} elevation={2}>
      <Box className={classes.contentWaiting}>
        <Typography variant="h4">Waiting for the game to start...</Typography>
        <Box className={classes.contentItem}>
          <Button onClick={onStartGame} variant="outlined" color="primary">
            Start game
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
