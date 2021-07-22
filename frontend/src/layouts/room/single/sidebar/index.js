import { Paper, Grid } from '@material-ui/core';
import ListPlayers from '../listPlayers';
import ChatBox from '../chatbox';

const PARTICIPANTS_LIST_HEIGHT = '40%';
const CHAT_HEIGHT = '60%';

function Sidebar(props) {
  const classes = props.classes;
  const players = props.players;

  return (
    <Paper
      elevation={2}
      style={{ height: '100%' }}
      className={classes.backgroundPaper}
    >
      <Grid container direction="column" style={{ height: '100%' }}>
        <Grid item style={{ height: PARTICIPANTS_LIST_HEIGHT }}>
          <ListPlayers players={players} />
        </Grid>
        {/* Chat area */}
        <Grid item style={{ height: CHAT_HEIGHT }}>
          <ChatBox />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Sidebar;
