import { Avatar, Box, Typography } from '@material-ui/core';
import useStyles from './styles';

export default function SinglePlayer({ player }) {
  const classes = useStyles();

  return (
    <Box className={classes.outer}>
      <Avatar className={classes.avatar} alt={player.name} src={player.avatar}>
        {player.name.charAt(0)}
      </Avatar>
      <Box className={classes.info}>
        <Typography className={classes.infoText} variant="body2">
          {player.name}
        </Typography>
        <Typography className={classes.infoText} variant="body2">
          <b>{`${player.points} Pts`}</b>
        </Typography>
      </Box>
    </Box>
  );
}
