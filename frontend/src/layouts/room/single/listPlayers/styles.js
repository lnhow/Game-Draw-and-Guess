import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  listPlayers: {
    textAlign: 'center',
    color: theme.palette.text.primary,
    overflowY: 'scroll',
  },
}));
