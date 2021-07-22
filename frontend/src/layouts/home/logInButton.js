import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const logInButton = withStyles({
  root: {
    color: 'white',
    marginBottom: '40px',
    marginTop: '10px',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 18,
    padding: '6px 40px',
    border: '4px solid #001B4D',
    borderRadius: '25px',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    fontFamily: '"Gorditas", cursive',
    '&:hover': {
      backgroundColor: '#0069d9',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0rem rgba(0,123,255,.5)',
    },
  },
})(Button);

export default logInButton;
