import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 0),
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    marginLeft: theme.spacing(40),
    marginRight: theme.spacing(20),
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    justify: 'center',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(10),
    width: '300px',
  },
  description: {
    fontFamily: '"Fredoka One", cursive',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  divider: {
    marginLeft: theme.spacing(5),
    width: '4px',
  },
  text: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: '22px',
    color: '#616161',
    textAlign: 'center',
  },
  img: {
    border: '4px solid #616161',
    backgroundColor: 'white',
    borderRadius: '50px',
    padding: '5px',
    width: '168px',
    height: '168px',
  },
}));

export default useStyles;
