import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ExitToApp } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';

const textStyle = {
  textDecoration: 'none',
  color: 'white',
};

const Input = ({
  name,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  handleShowPassword,
  placeholder,
  link,
}) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      placeholder={placeholder}
      link={link}
      InputProps={
        name === 'password'
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === 'password' ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : name === 'roomId'
          ? {
              endAdornment: (
                <Link to={link} style={textStyle} name={name}>
                  <IconButton type="submit" aria-label="Join Room">
                    <ExitToApp />
                  </IconButton>
                </Link>
              ),
            }
          : name === 'search'
          ? {
              endAdornment: (
                <IconButton type="submit" aria-label="Search Room" href="">
                  <SearchIcon />
                </IconButton>
              ),
            }
          : null
      }
    />
  </Grid>
);

export default Input;
