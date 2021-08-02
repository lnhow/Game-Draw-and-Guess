import { Paper, Box } from '@material-ui/core';

function TopBar(props) {
  const classes = props.classes;

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
            [Time left]
          </h2>
        </Box>
      </Box>
    </Paper>
  );
}

export default TopBar;
