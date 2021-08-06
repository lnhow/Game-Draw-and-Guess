import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  outerEnd: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(2),
  },
  leaderboard: {
    width: '100%',
    maxHeight: '500px',
    overflowY: 'auto',
    margin: theme.spacing(2),
  },
  contentItem: {
    margin: theme.spacing(1),
  },
}));
