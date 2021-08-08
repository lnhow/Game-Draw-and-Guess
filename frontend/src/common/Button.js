import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

import { Button } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

const CustomButton = withStyles({
  root: {
    color: 'white',
    marginBottom: '30px',
    marginTop: '10px',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 18,
    padding: '6px 40px',
    border: '4px solid #001B4D',
    borderRadius: '25px',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    fontFamily: '"Gorditas", cursive',
    '&:hover': {
      backgroundColor: '#0069d9',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
    },
    '&:focus': {
      boxShadow: '0 0 0 0rem rgba(0,123,255,.5)',
    },
  },
})(Button);

const textStyle = {
  textDecoration: 'none',
  color: 'white',
};

export const FuncButton = (props) => {
  return (
    <Link to={props.link} style={textStyle} name={props.name}>
      <CustomButton
        variant="contained"
        style={{ backgroundColor: props.bgcolor, marginRight: props.mr }}
        onClick={props.handleClick}
        onSubmit={props.handleSubmit}
        type={props.type}
        disabled={props.disabled}
      >
        {props.name === 'esport' ? (
          <SportsEsportsIcon />
        ) : props.name === 'room' ? (
          <MeetingRoomIcon />
        ) : null}
        {props.text}
      </CustomButton>
    </Link>
  );
};

FuncButton.propTypes = {
  backgroundColor: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.string,
};

FuncButton.default = {
  backgroundColor: '#0063cc',
  text: '',
  link: '',
};
