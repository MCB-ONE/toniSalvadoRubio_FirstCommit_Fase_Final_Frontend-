import axiosConfig from '../../utils/axios.config';
import authHeader from '../auth/auth-header';

// Call authHeaeder auxiliar function to generate the request`s headers to includ the bearer token
const getAllClientes = (query = '') => {
  if (query === '') {
    return axiosConfig.get('api/clientes', { headers: authHeader() });
  }
  console.log(query);
  return axiosConfig.get(`api/clientes/?${query}`, { headers: authHeader() });
};

const getClientesById = (id) => {
  return axiosConfig.get(`api/clientes/${id}`, { headers: authHeader() });
};

const createCliente = (cliente) => {
  return axiosConfig.post('api/clientes', cliente, { headers: authHeader() });
};

const updateCliente = ({ field, id }) => {
  const name = Object.keys(field)[0];
  const value = Object.values(field)[0];
  const formData = new FormData();
  console.log(name, value);
  console.log('Service update cliente form data: ');
  formData.append(name, value);
  return axiosConfig.put(`api/clientes/${id}`, formData, { headers: authHeader() });
};

const clientesService = {
  getAllClientes,
  getClientesById,
  createCliente,
  updateCliente,
};

export default clientesService;
