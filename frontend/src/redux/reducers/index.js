import { combineReducers } from 'redux';

import auth from './auth.js';
import error from './error.js';

export default combineReducers({
  auth,
  error,
});
