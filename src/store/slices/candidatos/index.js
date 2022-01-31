import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../message';

import CandidatosService from '../../../services/candidatos/candidato.service';

// CRUD thunk middlewares
export const getAllCandidatos = createAsyncThunk(
  'candidatos/fetchAll',
  async (query = '', thunkAPI) => {
    try {
      const data = await CandidatosService.getAllCandidatos(query);
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
      const data = await CandidatosService.createCandidato(candidato);
      return { candidato: data.data };
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

export const updateCandidato = createAsyncThunk(
  'candidatos/update',
  // eslint-disable-next-line no-unused-vars
  async (updateData, thunkAPI) => {
    try {
      await CandidatosService.updateCandidato(updateData);
      const data = await CandidatosService.getCandidatosById(updateData.id);
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

export const updateCandidatoTags = createAsyncThunk(
  'candidatos/updateTags',
  // eslint-disable-next-line no-unused-vars
  async (updateData, thunkAPI) => {
    try {
      await CandidatosService.updateCandidatoTag(updateData);
      const data = await CandidatosService.getCandidatosById(updateData.id);
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
      state.detail = [action.payload];
    },
    [createCandidato.rejected]: (state, action) => {
      state.loading = false;
      state.error = [action.payload];
    },
    // Candidato update async reducers
    [updateCandidato.fulfilled]: (state, action) => {
      state.loading = false;
      state.detail = [action.payload.candidato];
    },
    [updateCandidato.rejected]: (state, action) => {
      state.loading = false;
      state.error = [action.payload];
    },
    // Candidato update TAGS async reducers
    [updateCandidatoTags.fulfilled]: (state, action) => {
      state.loading = false;
      state.detail = [action.payload.candidato];
    },
    [updateCandidatoTags.rejected]: (state, action) => {
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
