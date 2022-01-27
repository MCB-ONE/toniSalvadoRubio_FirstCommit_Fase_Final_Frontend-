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
  async (id, thunkAPI) => {
    try {
      const data = await CandidatosService.getCandidatosById(id);
      return { candidato: data.data.data };
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

export const createCandidato = createAsyncThunk(
  'candidatos/create',
  async (candidato, thunkAPI) => {
    try {
      console.log('Create Thunk try block');
      const data = await CandidatosService.createCandidato(candidato);
      return { candidato: data };
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

// Sync reducer
export const cleanCandidatoDetail = () => {
  // eslint-disable-next-line no-undef
  return dispatch(cleanCandidatoDetail(false));
};

// Slice initial state
const initialState = {
  list: false,
  detail: false,
  isLoading: false,
  error: false,
};

const candidatoSlice = createSlice({
  name: 'candidatos',
  initialState,
  reducers: {
    resetDetail: (state) => {
      state.detail = false;
    },
  },
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
    },
    // CandidatoByIdReducers
    [getCandidatoById.pending]: (state) => {
      state.loading = true;
    },
    [getCandidatoById.fulfilled]: (state, action) => {
      state.loading = false;
      state.detail = [action.payload.candidato];
    },
    [getCandidatoById.rejected]: (state, action) => {
      state.loading = false;
      state.error = [action.payload];
    },
    // Candidato create async reducers
    [createCandidato.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('Create reducer fulifield:');
      console.log(action.payload.candidato);
      state.detail = [action.payload.candidato];
    },
    [createCandidato.rejected]: (state, action) => {
      state.loading = false;
      state.error = [action.payload];
    },
  },
});
// Destructure and export the plain action creators
export const { resetDetail } = candidatoSlice.actions;
export const getSelectedCndidato = (state) => state.detail;
const { reducer } = candidatoSlice;
export default reducer;
