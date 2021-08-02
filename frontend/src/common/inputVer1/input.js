import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import EndButtonSwitcher from './endButton/switcher';

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
      InputProps={{
        endAdornment: (
          <EndButtonSwitcher
            name={name}
            type={type}
            link={link}
            handleShowPassword={handleShowPassword}
          />
        ),
      }}
    />
  </Grid>
);

export default Input;
