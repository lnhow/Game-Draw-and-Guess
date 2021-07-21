import React from 'react';
import PropTypes from 'prop-types';
import { Box, FormGroup, TextField, InputLabel } from '@material-ui/core';
import { ErrorMessage } from 'formik';

const InputField = (props) => {
  const { field, form, type, disabled, placeholder, label } = props;
  const { name } = field;
  const { errors, touched } = form;
  const isError = touched[name] && errors[name];

  return (
    <FormGroup spacing={3}>
      <Box mb={2}>
        <InputLabel shrink>{label}</InputLabel>
      </Box>

      <Box mb={2}>
        <TextField
          error={isError}
          helperText={<ErrorMessage name={name} />}
          id={name}
          {...field}
          label={placeholder}
          type={type}
          variant="outlined"
          disabled={disabled}
        />
      </Box>
    </FormGroup>
  );
};

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

InputField.default = {
  type: 'text',
  disabled: false,
  label: '',
  placeholder: '',
};

export default InputField;
