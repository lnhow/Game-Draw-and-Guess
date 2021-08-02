import PasswordToggler from './passwordToggler';
import JoinRoomButton from './joinRoomButton';
import SearchButton from './searchButton';

function EndButtonSwitcher({ name, type, link, handleShowPassword }) {
  if (name === 'password') {
    return (
      <PasswordToggler type={type} handleShowPassword={handleShowPassword} />
    );
  } else if (name === 'roomId') {
    return <JoinRoomButton link={link} name={name} />;
  } else if (name === 'search') {
    return <SearchButton />;
  }

  return null;
}

export default EndButtonSwitcher;
