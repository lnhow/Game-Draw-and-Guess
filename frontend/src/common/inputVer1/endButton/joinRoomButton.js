import { IconButton } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { Link } from 'react-router-dom';

function JoinRoomButton({ link, name }) {
  return (
    <Link to={link} name={name}>
      <IconButton type="submit" aria-label="Join Room">
        <ExitToApp />
      </IconButton>
    </Link>
  );
}

export default JoinRoomButton;
