/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../message';

import AuthService from '../../../services/auth/auth.service';

const user = JSON.parse(localStorage.getItem('user'));

// Loging thunk middleware
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      return { user: data };
    } catch (error) {
      const message = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  },
);

// Logout thunk middleware
/* export const logout = createAsyncThunk(
  'auth/logout', async () => {
    await AuthService.logout();
  },
);
 */
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user');
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});
export const { logout } = authSlice.actions;
const { reducer } = authSlice;
export default reducer;
