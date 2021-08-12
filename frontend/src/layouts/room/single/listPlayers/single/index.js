import { Avatar, Box, Typography } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import useStyles from './styles';

export default function SinglePlayer({ player, order }) {
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
          <span>
            {player.isCorrect ? (
              <CheckCircle style={{ fill: 'green', fontSize: 18 }} />
            ) : (
              <div></div>
            )}
          </span>
        </Typography>
      </Box>
      <Box className={classes.order}>
        {order ? (
          <Typography className={classes.orderText} variant="h5">
            {`${order}`}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
}
