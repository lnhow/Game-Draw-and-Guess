import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  backgroundPaper: {
    background: theme.palette.background.accent,
  },
}));
