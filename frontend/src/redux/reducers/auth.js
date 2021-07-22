import {
  LOGOUT,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../actions/types.js';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      //FETCHING USER DATA FROM BACKEND
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      //COMPLETE FETCHING USER DATA FROM BACKEND
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('profile', {});
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        ...action.payload, // {user: {st...}, token: "..."}
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducers;
