import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  waiting: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWaiting: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentItem: {
    margin: theme.spacing(2),
  },
}));
