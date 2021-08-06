import { Paper } from '@material-ui/core';
import SinglePlayer from './single';
import useStyles from './styles';

function ListPlayers({ players, ordered }) {
  const classes = useStyles();
  return (
    <Paper elevation={2} className={classes.listPlayers}>
      {players.map((player, index) => (
        <SinglePlayer
          order={ordered ? index + 1 : null}
          key={player.id}
          player={player}
        />
      ))}
    </Paper>
  );
}

export default ListPlayers;
