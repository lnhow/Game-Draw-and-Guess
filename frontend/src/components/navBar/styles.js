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
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  purple: {
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    backgroundColor: theme.palette.secondary.main,
  },
  profile: {
    justifyContent: 'center',
    marginRight: 8,
  },
}));
