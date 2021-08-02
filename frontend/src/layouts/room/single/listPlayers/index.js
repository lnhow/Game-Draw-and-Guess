import { Paper } from '@material-ui/core';
import SinglePlayer from './single';
import useStyles from './styles';

function ListPlayers({ players }) {
  const classes = useStyles();
  return (
    <Paper elevation={2} className={classes.listPlayers}>
      {players.map((player) => (
        <SinglePlayer key={player.id} player={player} />
      ))}
    </Paper>
  );
}

export default ListPlayers;
