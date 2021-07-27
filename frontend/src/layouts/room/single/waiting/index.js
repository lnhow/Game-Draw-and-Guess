import { Paper, Typography, Button, Box, TextField } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import useStyles from './styles';

export default function WaitingScreen({ onStartGame }) {
  const classes = useStyles();
  const { id } = useParams();

  return (
    <Paper className={classes.waiting} elevation={2}>
      <Box className={classes.contentWaiting}>
        <Typography className={classes.contentItem} variant="h5">
          Waiting for the game to start...
        </Typography>
        <Typography variant="body1">Invite ID</Typography>
        <TextField
          className={classes.contentItem}
          type="text"
          defaultValue={`${id}`}
          variant="outlined"
          inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
        />
        <Box className={classes.contentItem}>
          <Button onClick={onStartGame} variant="outlined" color="primary">
            Start game
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
