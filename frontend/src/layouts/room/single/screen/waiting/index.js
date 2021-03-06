import {
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useStyles from './styles';

export default function WaitingScreen({ onStartClick }) {
  const classes = useStyles();
  const { id } = useParams();
  const userId = useSelector((state) => state.user.id);
  const roomHost = useSelector((state) => state.room.hostUserId);

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
          {userId === roomHost ? (
            <Tooltip
              title={
                <>
                  <Typography color="inherit">Start game</Typography>
                  <em>
                    {
                      'You can only start game when there are more than 1 people in the room'
                    }
                  </em>
                </>
              }
            >
              <Button onClick={onStartClick} variant="outlined" color="primary">
                Start game
              </Button>
            </Tooltip>
          ) : null}
        </Box>
      </Box>
    </Paper>
  );
}
