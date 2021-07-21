import React from 'react';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import { Formik, FastField, Form } from 'formik';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './styles.js';
import InputField from '../../common/inputField/inputField';
import { Link } from 'react-router-dom';


function Login() {
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
    email: '',
    password: '',
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Formik initialValues={initialValues}>
          {(formikProps) => {
            return (
              <Form>
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
              </Form>
            );
          }}
        </Formik>
        <Grid container justifyContent="flex-end">
          <Grid item>
            Don't have an account?
            <Link to="/sign-up">Sign Up</Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Login;
