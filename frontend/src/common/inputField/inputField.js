import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from '@material-ui/core';
import { Label } from '@material-ui/icons';
import Input from './input.js';


const InputField = (props) => {
    const {field,type,disabled,placeholder,label} = props
    const {name,value,onChange,onBlur} = field


  return (
    <FormGroup>
    {label && <Label for="name">Title</Label>}
      <Input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={placeholder}
        // handleChange={handleChange}
        type={type}
        disabled={disabled}
      />
    </FormGroup>
  );
};

InputField.propTypes = {
    field : PropTypes.object.isRequired,
    form : PropTypes.object.isRequired,

    type : PropTypes.string,
    disabled : PropTypes.bool,
    label: PropTypes.string,
    placeholder: PropTypes.string

};

InputField.default ={
    type:"text",
    disabled:false,
    label:'',
    placeholder:''
}

export default InputField;
