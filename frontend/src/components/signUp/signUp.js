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
import * as yup from 'yup';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './styles.js';
import InputField from '../../common/inputField/inputField';
import { Link } from 'react-router-dom';

const SignUpSchema = yup.object().shape({
  username: yup.string().required('field not empty'),
  email: yup.string().email('field email').required('field not empty'),
  password: yup
    .string()
    .min(3, 'field min 3')
    .max(6, 'field max 6')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

function SignUp() {
  const classes = useStyles();

  const handleSubmit = (values, actions) => {
    // //////////Call API//////////////////////
    console.log(actions.submitForm);
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      // actions.setSubmitting(false);
    }, 2000);
    ////////////////End call API/////////////////////////////////////////

    actions.resetForm({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

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
        <Formik
          initialValues={initialValues}
          onSubmit={(values, action) => handleSubmit(values, action)}
          validationSchema={SignUpSchema}
        >
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
                  disabled={!formikProps.isValid || !formikProps.dirty}
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
