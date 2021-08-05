import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.primary.main,
  },
  heading: {
    color: 'white',
    textDecoration: 'none',
    textAlign: 'center',
    padding: theme.spacing(1),
    fontFamily: '"Gorditas", cursive',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  avatar: {
    border: '3px solid black',
    backgroundColor: 'white',
  },
}));
