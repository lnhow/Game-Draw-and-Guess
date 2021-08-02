import { Avatar, Box, Typography } from '@material-ui/core';
import useStyles from './styles';

export default function SinglePlayer({ player }) {
  const classes = useStyles();

  return (
    <Box className={classes.outer}>
      <Avatar
        className={classes.avatar}
        alt={player.username}
        src={player.avatar}
      >
        {player.username.charAt(0)}
      </Avatar>
      <Box className={classes.info}>
        <Typography className={classes.infoText} variant="body2">
          {player.username}
        </Typography>
        <Typography className={classes.infoText} variant="body2">
          <b>{`${player.points} Pts`}</b>
        </Typography>
      </Box>
    </Box>
  );
}
