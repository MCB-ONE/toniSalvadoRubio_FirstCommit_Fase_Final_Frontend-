import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from '../message';
import clientesService from '../../../services/clientes/cliente.service';

export const getAllClientes = createAsyncThunk(
  'clientes/fetchAll',
  async (query = '', thunkAPI) => {
    try {
      const data = await clientesService.getAllClientes(query);
      return { clientes: data.data.data.data };
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

export const getClienteById = createAsyncThunk(
  'cliente/fetchById',
  async (id, thunkAPI) => {
    try {
      const data = await clientesService.getClientesById(id);
      return { cliente: data.data.data };
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

export const createCliente = createAsyncThunk(
  'clientes/create',
  async (cliente, thunkAPI) => {
    try {
      const data = await clientesService.createCliente(cliente);
      return { cliente: data.data };
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

export const updateCliente = createAsyncThunk(
  'clientes/update',
  // eslint-disable-next-line no-unused-vars
  async (updateData, thunkAPI) => {
    try {
      await clientesService.updateCliente(updateData);
      const data = await clientesService.getClienteById(updateData.id);
      return { cliente: data.data.data };
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
export const cleanClienteDetail = () => {
  // eslint-disable-next-line no-undef
  return dispatch(cleanClienteDetail(false));
};

// Slice initial state
const initialState = {
  list: false,
  detail: false,
  isLoading: false,
  error: false,
};

// Testing redux whit static data
export const clientesSlice = createSlice({
  name: 'clientes',
  initialState,
  reducers: {
    resetDetail: (state) => {
      state.detail = false;
    },
  },
  extraReducers: {
    [getAllClientes.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllClientes.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.list = action.payload.clientes;
    },
    [getAllClientes.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = [action];
    },
    // ClientesByIdReducers
    [getClienteById.pending]: (state) => {
      state.loading = true;
    },
    [getClienteById.fulfilled]: (state, action) => {
      state.loading = false;
      state.detail = [action.payload.cliente];
    },
    [getClienteById.rejected]: (state, action) => {
      state.loading = false;
      state.error = [action.payload];
    },
    // Cliente create async reducers
    [createCliente.fulfilled]: (state, action) => {
      state.loading = false;
      state.detail = [action.payload];
    },
    [createCliente.rejected]: (state, action) => {
      state.loading = false;
      state.error = [action.payload];
    },
    // Cliente update async reducers
    [updateCliente.fulfilled]: (state, action) => {
      state.loading = false;
      state.detail = [action.payload.cliente];
    },
    [updateCliente.rejected]: (state, action) => {
      state.loading = false;
      state.error = [action.payload];
    },
  },
});

// Destructure and export the plain action creators
export const { resetDetail } = clientesSlice.actions;
export const getSelectedCliente = (state) => state.detail;
const { reducer } = clientesSlice;
export default reducer;
