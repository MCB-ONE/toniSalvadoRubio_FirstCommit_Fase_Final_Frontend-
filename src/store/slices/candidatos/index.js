import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../message';

import CandidatosService from '../../../services/candidatos/candidato.service';

// CRUD thunk middlewares
export const getAllCandidatos = createAsyncThunk(
  'candidatos/fetchAll',
  async (thunkAPI) => {
    try {
      const data = await CandidatosService.getAllCandidatos();
      return { candidatos: data.data.data.data };
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

export const getCandidatoById = createAsyncThunk(
  'candidatos/fetchById',
  async ({ id }, thunkAPI) => {
    try {
      const data = await CandidatosService.getCandidatosById(id);
      return { candidatos: data };
    } catch (error) {
      const message = (error.response
                  && error.response.data
                  && error.response.data.message)
                || error.message
                || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return error;
    }
  },
);

// Slice initial state
const initialState = {
  list: null,
  isLoading: false,
  error: null,
};

const candidatoSlice = createSlice({
  name: 'candidatos',
  initialState,
  // TODO APPLY SYNC REDUCERS LIKE FILTERS
  extraReducers: {
    [getAllCandidatos.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllCandidatos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.list = action.payload.candidatos;
    },
    [getAllCandidatos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = [action];
    }, /*
    [getCandidatoById.pending]: (state) => {
      state.loading = true;
    },
    [getCandidatoById.fulfilled]: (state, action) => {
      state.loading = false;
      state.list = [action.payload];
    },
    [getCandidatoById.rejected]: (state, action) => {
      state.loading = false;
      state.error = [action.payload];
    }, */
  },
});

const { reducer } = candidatoSlice;
export default reducer;
