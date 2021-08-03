import { Paper, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';

function TopBar() {
  const classes = useStyles();
  const timer = useSelector((state) => state.room.roundTimer);

  return (
    <Paper
      elevation={2}
      className={classes.backgroundPaper}
      style={{ height: '100%' }}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        style={{ height: '100%', padding: 8 }}
      >
        <Box flexGrow={1} style={{ textAlign: 'center' }}>
          <span>The word is</span>
          <h2 style={{ margin: 0, textAlign: 'center' }}>[Word]</h2>
        </Box>
        <Box>
          <span>Round [2] of [3]</span>
          <h2 id="counter" style={{ margin: 0, textAlign: 'center' }}>
            {timer}
          </h2>
        </Box>
      </Box>
    </Paper>
  );
}

export default TopBar;
