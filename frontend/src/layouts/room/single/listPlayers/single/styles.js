import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  outer: {
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing(1),
  },
  info: {
    display: 'flex',
    marginLeft: theme.spacing(1),
    flexDirection: 'column',
  },
  infoText: {
    textAlign: 'left',
  },
}));
