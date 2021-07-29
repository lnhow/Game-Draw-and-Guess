import { InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons/';

function PasswordToggler({ type, handleShowPassword }) {
  return (
    // <InputAdornment position="end">
    <IconButton onClick={handleShowPassword}>
      {type === 'password' ? <Visibility /> : <VisibilityOff />}
    </IconButton>
    // </InputAdornment>
  );
}

export default PasswordToggler;
