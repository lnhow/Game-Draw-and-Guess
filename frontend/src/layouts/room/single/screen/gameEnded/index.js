import { Paper, Typography, Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './styles';

export default function GameEndScreen() {
  const classes = useStyles();

  return (
    <Paper className={classes.waiting} elevation={2}>
      <Box className={classes.contentWaiting}>
        <Typography className={classes.contentItem} variant="h5">
          Game ended
        </Typography>
        <Button variant="outlined" component={Link} to="/" color="primary">
          Exit game
        </Button>
      </Box>
    </Paper>
  );
}
