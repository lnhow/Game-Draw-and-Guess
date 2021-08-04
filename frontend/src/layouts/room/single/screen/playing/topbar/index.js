import { Paper, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';

function TopBar() {
  const classes = useStyles();
  const timer = useSelector((state) => state.room.roundTimer);
  const drawerWord = useSelector((state) => state.room.drawerWord);

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
          {drawerWord ? (
            <>
              <span>The word is</span>
              <h2 style={{ margin: 0, textAlign: 'center' }}>{drawerWord}</h2>
            </>
          ) : (
            <div></div>
          )}
        </Box>
        <Box>
          {/* <span>Round [2] of [3]</span> */}
          <h2 id="counter" style={{ margin: 0, textAlign: 'center' }}>
            {`${timer} s`}
          </h2>
        </Box>
      </Box>
    </Paper>
  );
}

export default TopBar;
