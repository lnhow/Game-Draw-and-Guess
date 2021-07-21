import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    background: 'rgba(0,0,0,0)',
  },
  heading: {
    color: 'black',
    textDecoration: 'none',
    textAlign: 'center',
    padding: theme.spacing(1),
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  avatar: {
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    backgroundColor: theme.palette.secondary.main,
  },
}));
