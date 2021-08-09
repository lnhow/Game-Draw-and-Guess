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
import { ConsoleLog } from '../../helpers/functions.js';
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
  email: yup
    .string()
    .email('Please enter an email')
    .required('Email must not be empty'),
  password: yup
    .string()
    .min(6, 'Password have to contains at least 6 characters')
    .max(20, 'Password max length is 20')
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
        updateUser({
          isLogin: true,
          id: infoUser.payload.userId,
          username: infoUser.payload.username,
          isToken: true,
        }),
      );
      await localStorage.setItem('user', reponses.token);
      await localStorage.setItem('isLogin', true);

      setMessageConflictDataSever('');
      actions.resetForm({
        email: '',
        password: '',
      });
      history.push('/');
    } catch (error) {
      setMessageConflictDataSever(error?.['response']?.data?.message);
      ConsoleLog({ error: error.message });
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
        {messageConflictDataSever ?? (
          <Box my={2}>
            <h3 style={{ color: 'red' }}>{messageConflictDataSever}</h3>
          </Box>
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
          validationSchema={LoginSchema}
        >
          {(formikProps) => {
            return (
              <Form className={classes.form}>
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
                  Log In
                </Button>
              </Form>
            );
          }}
        </Formik>
        <Grid container justifyContent="flex-end">
          <Grid item>
            Don't have an account? &emsp;
            <Link to="/sign-up">Sign Up</Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Login;
