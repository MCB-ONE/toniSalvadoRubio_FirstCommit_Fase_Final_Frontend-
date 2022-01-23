import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import messageReducer from './slices/message';
import alumnosReducer from './slices/alumnos';
/* import clientesReducer from './slices/clientes'; */

// Redux store configuration
const reducer = {
  auth: authReducer,
  message: messageReducer,
  alumnos: alumnosReducer,
  /* clientes: clientesReducer, */
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
