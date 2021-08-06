import {
  Container,
  Divider,
  Grid,
  Typography,
  CssBaseline,
  Box,
} from '@material-ui/core';
import { FuncButton } from '../../common/Button.js';
import Footer from '../../components/footer/index.js';
import AvarModal from '../../common/modal/avarModal.js';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Formik, FastField, Form } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../features/User/userSlice.js';
import jwt from 'jsonwebtoken';
import React, { useState } from 'react';
import userApi from '../../api/userApi';
import InputPassword from '../../common/inputPassword/inputPassword.js';
import InputField from '../../common/inputField/inputField';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 0),
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    marginLeft: theme.spacing(35),
    marginRight: theme.spacing(20),
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    alignItems: 'center',
    justifyItems: 'center',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(10),
  },
  welcome: {
    fontFamily: '"Gorditas", cursive',
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
  },
  description: {
    fontFamily: '"Fredoka One", cursive',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  divider: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    width: '4px',
  },
  table: {
    width: 'max-content',
  },
}));

const intro = {
  color: '#FFA500',
  weight: '400',
  fontSize: 30,
  textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
};

const gameName = {
  fontSize: '40px',
  color: '#800080',
};

const ProfileSchema = yup.object().shape({
  username: yup
    .string()
    .min(6, 'username min 6')
    .required('Username is required'),
  password: yup
    .string()
    .min(6, 'password min 6')
    .max(20, 'password max 20')
    .required('Password is required'),
  avatar: yup.string().required('Avatar is required'),
});

function ProfileEdit() {
  const classes = useStyles();
  const User = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [messageConflictDataSever, setMessageConflictDataSever] = useState('');

  const initialValues = {
    username: '',
    password: '',
    avatar: '',
  };

  const handleSubmit = async (values) => {
    try {
      const reponses = await userApi.editProfile(values);
      const infoUser = jwt.decode(reponses.token, { complete: true });
      dispatch(
        updateUser({
          username: infoUser.payload.username,
          avatar: infoUser.payload.avatar,
        }),
      );
      await localStorage.setItem('user', reponses.token);

      setMessageConflictDataSever('');
    } catch (error) {
      setMessageConflictDataSever(error?.['response']?.data?.msg);
      console.log({ error: error.message });
    }
  };

  return (
    <Container component="main" className={classes.root}>
      <CssBaseline />
      <div>
        <Typography variant="h5" className={classes.welcome} style={gameName}>
          You've logged in!
        </Typography>
        <Typography variant="h6" className={classes.description} style={intro}>
          {User.username}
        </Typography>
      </div>

      <Box my={2}>
        <h3 style={{ color: 'red' }}>{messageConflictDataSever}</h3>
      </Box>

      <Grid>
        <img name="avatar" src={User.avatar} alt="avatar" />
        <AvarModal />
      </Grid>
      <Divider className={classes.divider} orientation="vertical" flexItem />
      <Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
          validationSchema={ProfileSchema}
        >
          {(formikProps) => {
            return (
              <Form style={classes.form}>
                <label htmlFor="email">Email</label>
                <FastField
                  name="email"
                  disabled
                  placeholder={User.email}
                  type="email"
                  value={User.email}
                  component={InputField}
                />
                <label htmlFor="username">Username</label>
                <FastField
                  name="username"
                  placeholder={User.username}
                  type="text"
                  value={User.username}
                  component={InputField}
                />
                <label htmlFor="email">Password</label>
                <FastField
                  name="password"
                  placeholder={User.password}
                  type="password"
                  value={User.password}
                  component={InputPassword}
                />
                <FuncButton
                  type="submit"
                  text="Save"
                  bgcolor="#F97645"
                ></FuncButton>

                {/* <div className={classes.container}> */}
                {/* <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                            username
                            </TableCell>
                            <TableCell align="left">
                                <Input
                                    placeholder={User.username}
                                    type="text"
                                    name="username"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                email
                            </TableCell>
                            <TableCell align="left">
                            <Input
                                placeholder={User.username}
                                disabled
                                value="example@gmai.com"
                            />
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                password
                            </TableCell>
                            <TableCell align="left">
                            <Input
                                placeholder={User.password}
                                type="password"
                                name="password"
                            />
                            </TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer> */}
                {/* <FuncButton
                        type="submit"
                        text="save"
                        bgcolor="#F97645"
                    ></FuncButton> */}
              </Form>
            );
          }}
        </Formik>
      </Grid>

      <Grid item xs="12">
        <Footer />
      </Grid>
    </Container>
  );
}

export default ProfileEdit;
