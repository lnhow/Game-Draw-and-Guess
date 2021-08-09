import { useSelector } from 'react-redux';
import AvarModal from '../../common/modal/avarModal.js';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../features/User/userSlice.js';
import jwt from 'jsonwebtoken';
import React, { useState } from 'react';
import userApi from '../../api/userApi';
import { useHistory } from 'react-router-dom';
import Footer from '../footer/index.js';
import WelcomeBanner from '../../components/banner/welcomeBanner.js';
import SaveChangeModal from '../../common/modal/saveChange.js';
import { Container, Divider, Grid, CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 0),
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    marginLeft: theme.spacing(45),
    marginRight: theme.spacing(20),
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    justify: 'center',
    alignItems: 'center',
  },
  divider: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    width: '4px',
  },
  img: {
    border: '4px solid #616161',
    backgroundColor: 'white',
    borderRadius: '50px',
    padding: '5px',
    width: '168px',
    height: '168px',
  },
  input: {
    padding: '0.5rem',
    fontSize: '16px',
    width: '100%',
    display: 'block',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  label: {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '0.5rem',
    marginTop: '1rem',
  },
}));

const btn = {
  color: 'white',
  marginBottom: '30px',
  marginTop: '10px',
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 15,
  padding: '5px 30px',
  border: '4px solid #001B4D',
  borderRadius: '25px',
  lineHeight: 1.5,
  backgroundColor: '#ffbf00',
  fontFamily: '"Gorditas", cursive',
  cursor: 'pointer',
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
  },
  '&:focus': {
    boxShadow: '0 0 0 0rem rgba(0,123,255,.5)',
  },
};

const PasswordSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Must be 3 characters or more')
    .required('Required'),
});

function ProfileEdit() {
  const classes = useStyles();
  const history = useHistory();
  const User = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const initialValues = {
    username: '',
    avatar: '',
  };

  const [image, setImage] = useState('');

  const handleClickModal = (event) => {
    let avar = event.currentTarget?.firstChild?.currentSrc;

    event.preventDefault();
    setImage(avar);
  };

  const handleSubmit = async (values) => {
    try {
      values.avatar = image;
      console.log('values: ', values);
      const reponses = await userApi.editProfile(values);
      const infoUser = jwt.decode(reponses.token, { complete: true });
      console.log('infoUser', infoUser);
      dispatch(
        updateUser({
          username: infoUser.payload.username,
          avatar: infoUser.payload.avatar,
        }),
      );
      await localStorage.setItem('user', reponses.token);
      history.push('/');
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  return (
    <Container component="main" className={classes.root}>
      <CssBaseline />
      <WelcomeBanner />

      <div>
        <div className={classes.container}>
          <Grid>
            <img
              id="avatar"
              name="avatar"
              src={image || User.avatar}
              alt="avatar"
              className={classes.img}
            />
            <AvarModal onClick={handleClickModal} />
          </Grid>
          <Divider
            className={classes.divider}
            orientation="vertical"
            flexItem
          />
          <Grid item md={7} sm={12}>
            <Formik
              initialValues={initialValues}
              validationSchema={PasswordSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {(formikProps) => {
                return (
                  <Form style={{ width: 'max-content' }}>
                    <label htmlFor="username" className={classes.label}>
                      Username
                    </label>
                    <Field
                      id="username"
                      name="username"
                      type="text"
                      className={classes.input}
                    />
                    <ErrorMessage name="username" className={classes.error} />

                    <label htmlFor="oldpassword" className={classes.label}>
                      Current password
                    </label>
                    <Field
                      id="oldpassword"
                      name="oldpassword"
                      type="password"
                      className={classes.input}
                    />
                    <ErrorMessage name="oldpassword" />

                    <label htmlFor="password" className={classes.label}>
                      New password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className={classes.input}
                    />
                    <ErrorMessage name="password" />

                    <label htmlFor="passwordConfirm" className={classes.label}>
                      Confirm new password
                    </label>
                    <Field
                      id="passwordConfirm"
                      name="passwordConfirm"
                      type="password"
                      className={classes.input}
                    />
                    <ErrorMessage name="passwordConfirm" />

                    <SaveChangeModal
                      style={btn}
                      disabled={
                        !formikProps.isValid ||
                        !formikProps.dirty ||
                        formikProps.isSubmitting
                      }
                    />
                  </Form>
                );
              }}
            </Formik>
          </Grid>
        </div>
      </div>

      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Container>
  );
}

export default ProfileEdit;
