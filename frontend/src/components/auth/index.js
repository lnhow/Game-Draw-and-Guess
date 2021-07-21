import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons/';
import { Link, useHistory } from 'react-router-dom';

import { logIn, register } from '../../redux/actions/auth';
import { useDispatch } from 'react-redux';

import Input from './input.js';
import useStyles from './styles.js';

const initialFormData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function Auth({ isSignupMode = false }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsSignup] = useState(isSignupMode);
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (isRegister) {
      dispatch(register(formData, history));
    } else {
      dispatch(logIn(formData, history));
    }
  };

  const handleChange = (e) => {
    //Update only e.target.name form data
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //Toggle page mode between login & signup
  const switchMode = () => {
    setIsSignup(!isRegister);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isRegister ? 'Sign up' : 'Sign in'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isRegister && (
              <Input
                name="username"
                label="Username"
                handleChange={handleChange}
                autoFocus
              />
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isRegister && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isRegister ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              {/* Link to the same component, can't re-passing props */}
              <Button
                component={Link}
                to={isRegister ? '/login' : '/signup'}
                onClick={switchMode}
              >
                {isRegister
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
