import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    background: `linear-gradient(-45deg,${theme.palette.primary.main} 40%,${theme.palette.secondary.main})`,
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
    border: '3px solid #616161',
    backgroundColor: 'white',
    padding: '2px',
  },
}));
