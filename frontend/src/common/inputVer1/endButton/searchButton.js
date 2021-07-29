import { Search } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

function SearchButton() {
  return (
    <IconButton type="submit" aria-label="Search Room" href="">
      <Search />
    </IconButton>
  );
}

export default SearchButton;
