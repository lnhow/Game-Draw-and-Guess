import api from '../../helpers/api';

import {
  LOGOUT,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types.js';

const GET_USER_PATH = '/';

export const loadUser = () => (dispatch, getState) => {
  //Dispatch again because it is async
  //Loading user
  dispatch({ type: USER_LOADING });

  //Get token from local storage
  const token = getState().auth.token;

  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  if (token) {
    config.headers['auth-token'] = token;
  }

  api
    .get(GET_USER_PATH, config)
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data, // {user: {st...}, token: "..."}
      }),
    )
    .catch((err) =>
      dispatch({
        type: AUTH_ERROR,
      }),
    );
};
export const logIn = (formData, router) => async (dispatch) => {
  try {
    const logInData = {
      email: formData.email,
      password: formData.password,
    };
    const { data, headers } = await api.logIn(logInData);
    const token = headers['auth-token'];

    dispatch({ type: LOGIN_SUCCESS, data: { data, token } });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const register = (formData, router) => async (dispatch) => {
  try {
    const registerData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
    const { data, headers } = await api.register(registerData);
    const token = headers['auth-token'];

    dispatch({ type: REGISTER_SUCCESS, data: { data, token } });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};
