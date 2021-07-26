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

const SignUpSchema = yup.object().shape({
  username: yup.string().required('Username not empty'),
  email: yup.string().email('not an email').required('Email not empty'),
  password: yup
    .string()
    .min(6, 'password min 6')
    .max(20, 'password max 20')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [messageConflictDataSever, setMessageConflictDataSever] = useState('');

  const handleSubmit = async (values, actions) => {
    const infoUser = {
      username:values.username,
      email: values.email,
      password:values.password,
      passwordConfirm:values.confirmPassword
    };

    try {
      //Call Api Should I use useEffect?
      const reponses = await UserApi.register(infoUser);
      const reponsesVerify = jwt.verify(reponses.token, 'nowis4amandiamstillcoding');
      //store username and avatar ->redux
      console.log('reponsesVerify',reponsesVerify)
      setMessageConflictDataSever('');
      actions.resetForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      history.push('/');
    } catch (error) {
      setMessageConflictDataSever(error['response'].data.msg);
      console.log({ error: error.message });
    }
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
        <Box my={2}>
          <h3 style={{ color: 'red' }}>{messageConflictDataSever}</h3>
        </Box>
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
                  component={InputPassword}
                  placeholder="Password"
                  type="password"
                />
                <FastField
                  name="confirmPassword"
                  component={InputPassword}
                  placeholder="confirmPassword"
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
