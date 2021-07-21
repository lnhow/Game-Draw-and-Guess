import React from 'react';
import {
  Avatar,
  Button,
  Paper,
  Typography,
  Container,
  Grid,
} from '@material-ui/core';
import { Formik, FastField, Form } from 'formik';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './styles.js';
import InputField from '../../common/inputField/inputField';
import { Link } from 'react-router-dom';


function SignUp() {
  const classes = useStyles();

  // const [showPassword, setShowPassword] = useState(false);
  // const [isSignup, setIsSignup] = useState(isSignupMode);
  // const [formData, setFormData] = useState(initialFormData);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  // };

  // const handleChange = () => {};

  // const switchMode = () => {
  //   setIsSignup(!isSignup);
  // };

  // const handleShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik initialValues={initialValues}
        onSubmit={(values)=>console.log(values)}>
        {(formikProps) => {
            return (
            <Form>
                <FastField
                name="username"
                component={InputField}
                placeholder="User Name"
                type="text"
                />
                <FastField
                name="email"
                component={InputField}
                placeholder="Email Address"
                type="email"
                />
                <FastField
                name="password"
                component={InputField}
                placeholder="Password"
                type="password"
                />
                <FastField
                name="confirmPassword"
                component={InputField}
                placeholder="confirmPassword"
                type="password"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                >
                Sign Up
                </Button>
            </Form>
            );
        }}
        </Formik>
        <Grid container justifyContent="flex-end">
          <Grid item>
            Already have an account?
            <Link to="/login">Login</Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default SignUp;
