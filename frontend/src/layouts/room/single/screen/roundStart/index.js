import { Paper, Typography, Box } from '@material-ui/core';

import useStyles from './styles';

export default function RoundStartingScreen() {
  const classes = useStyles();

  return (
    <Paper className={classes.waiting} elevation={2}>
      <Box className={classes.contentWaiting}>
        <Typography className={classes.contentItem} variant="h5">
          Round Started
        </Typography>
        <Typography className={classes.contentItem} variant="body1">
          The drawer is
        </Typography>
        <Typography className={classes.contentItem} variant="h5">
          [Somebody]
        </Typography>
      </Box>
    </Paper>
  );
}
