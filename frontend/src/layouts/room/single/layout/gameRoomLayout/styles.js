import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  container: {
    margin: theme.spacing(1),
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  backgroundPaper: {
    background: theme.palette.background.accent,
  },
  media: {
    width: '100%',
    height: (props) => `${100 * props.ratio}%`,
  },
  outer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}));
