import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  FormGroup,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { ErrorMessage } from 'formik';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const InputPassword = (props) => {
  const { field, form, disabled, placeholder, label } = props;
  const { name } = field;
  const { errors, touched } = form;
  const isError = touched[name] && errors[name];
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormGroup spacing={3}>
      {label ?? (
        <Box mb={2}>
          <InputLabel shrink>{label}</InputLabel>
        </Box>
      )}
      <Box>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>{placeholder}</InputLabel>
          <OutlinedInput
            id={name}
            error={!!isError}
            label={placeholder}
            type={showPassword ? 'text' : 'password'}
            {...field}
            disabled={disabled}
            endAdornment={
              <InputAdornment position="end" visibility="hidden">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText id={name}>
            <ErrorMessage name={name} />
          </FormHelperText>
        </FormControl>
      </Box>
    </FormGroup>
  );
};

InputPassword.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  disabled: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

InputPassword.default = {
  disabled: false,
  label: '',
  placeholder: '',
};

export default InputPassword;
