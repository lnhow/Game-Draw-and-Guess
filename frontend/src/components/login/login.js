import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Box,
} from '@material-ui/core';
import { Formik, FastField, Form } from 'formik';
import * as yup from 'yup';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../features/User/userSlice.js';

import useStyles from './styles.js';
import InputField from '../../common/inputField/inputField';
import { Link } from 'react-router-dom';

import userApi from '../../api/userApi';
import jwt from 'jsonwebtoken';
import { useHistory } from 'react-router-dom';
import InputPassword from '../../common/inputPassword/inputPassword.js';

const LoginSchema = yup.object().shape({
  email: yup.string().email('not an email').required('Email not empty'),
  password: yup
    .string()
    .min(6, 'password min 6')
    .max(20, 'password max 20')
    .required('Password is required'),
});

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [messageConflictDataSever, setMessageConflictDataSever] = useState('');
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values, actions) => {
    try {
      const reponses = await userApi.login(values);
      const infoUser = jwt.decode(reponses.token, { complete: true });
      dispatch(
        updateUser({ isLogin: true, username: infoUser.payload.username }),
      );
      await localStorage.setItem('user', reponses.token);

      setMessageConflictDataSever('');
      actions.resetForm({
        email: '',
        password: '',
      });
      history.push('/home');
    } catch (error) {
      setMessageConflictDataSever(error?.['response']?.data?.msg);
      console.log({ error: error.message });
    }
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
        <Box my={2}>
          <h3 style={{ color: 'red' }}>{messageConflictDataSever}</h3>
        </Box>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
          validationSchema={LoginSchema}
        >
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
                  component={InputPassword}
                  placeholder="Password"
                  type="password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={
                    !formikProps.isValid ||
                    !formikProps.dirty ||
                    formikProps.isSubmitting
                  }
                  onDoubleClick={(e) => e.preventDefault()}
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
