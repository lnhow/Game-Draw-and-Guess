import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons/';

function PasswordToggler({ type, handleShowPassword }) {
  return (
    <IconButton onClick={handleShowPassword}>
      {type === 'password' ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  );
}

export default PasswordToggler;
