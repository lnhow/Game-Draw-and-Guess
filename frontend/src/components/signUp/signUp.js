import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Paper,
  Typography,
  Container,
  Grid,
  Box,
} from '@material-ui/core';
import { Formik, FastField, Form } from 'formik';
import * as yup from 'yup';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useStyles from './styles.js';
import InputField from '../../common/inputField/inputField';
import { Link } from 'react-router-dom';
import UserApi from '../../api/userApi.js';
import { useHistory } from 'react-router-dom';
import InputPassword from '../../common/inputPassword/inputPassword.js';
import jwt from 'jsonwebtoken';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../features/User/userSlice.js';
import { ConsoleLog } from '../../helpers/functions.js';

const SignUpSchema = yup.object().shape({
  username: yup.string().required('Username not empty'),
  email: yup.string().email('not an email').required('Email not empty'),
  password: yup
    .string()
    .min(6, 'password min 6')
    .max(20, 'password max 20')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [messageConflictDataSever, setMessageConflictDataSever] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    try {
      const reponses = await UserApi.register(values);
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
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
      });
      history.push('/');
    } catch (error) {
      setMessageConflictDataSever(error['response'].data.msg);
      ConsoleLog({ error: error.message });
    }
  };

  const initialValues = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
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
        {messageConflictDataSever ?? (
          <Box my={2}>
            <h3 style={{ color: 'red' }}>{messageConflictDataSever}</h3>
          </Box>
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={(values, action) => handleSubmit(values, action)}
          validationSchema={SignUpSchema}
        >
          {(formikProps) => {
            return (
              <Form className={classes.form}>
                <FastField
                  name="username"
                  component={InputField}
                  placeholder="Username"
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
                  component={InputPassword}
                  placeholder="Password"
                  type="password"
                />
                <FastField
                  name="passwordConfirm"
                  component={InputPassword}
                  placeholder="Confirm Password"
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
