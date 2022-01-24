import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import messageReducer from './slices/message';
import candidatosReducer from './slices/candidatos';

// Redux store configuration
const reducer = {
  auth: authReducer,
  message: messageReducer,
  candidatos: candidatosReducer,
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
