import { AUTH, LOGOUT } from '../actions/types.js';

const initialState = {
  token: localStorage.getItem('token'),
  authData: null,
  loading: false,
  user: null,
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducers;
