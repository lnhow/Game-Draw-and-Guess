import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    background: 'none',
    transition: '0.1s linear',
    '&:hover': {
      paddingLeft: theme.spacing(3),
    },
  },
  button: {
    textTransform: 'none',
    textAlign: 'left',
    padding: 0,
    height: '100%',
    color: theme.palette.text.primary,
    borderRadius: '8px',
    backgroundColor: theme.palette.background,
    overflowX: 'hidden',
    transition: '0.05s linear',
    '&:hover': {
      color: theme.palette.background.default,
      background: `linear-gradient(-45deg,${theme.palette.primary.main},${theme.palette.secondary.main})`,
    },
  },
  roomId: {
    fontSize: '0.7rem',
    fontWeight: '50',
  },
  roomName: {
    fontFamily: '"Roboto", sans-serif',
  },
  verticalCenter: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  setting: {
    margin: theme.spacing(1, 0),
    '& *': {
      margin: theme.spacing(1, 1, 0, 0),
    },
  },
  plainList: {
    listStyleType: 'none',
    paddingLeft: 0,
  },
}));
