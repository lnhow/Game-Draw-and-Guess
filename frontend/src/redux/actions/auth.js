import * as api from '../../helpers/api';

import { AUTH } from './types.js';

export const logIn = (formData, router) => async (dispatch) => {
  try {
    const logInData = {
      email: formData.email,
      password: formData.password,
    };
    const { data } = await api.logIn(logInData);

    dispatch({ type: AUTH, data });

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
    const { data } = await api.register(registerData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};
