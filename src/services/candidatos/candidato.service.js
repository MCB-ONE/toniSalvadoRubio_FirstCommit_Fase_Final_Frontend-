import axiosConfig from '../../utils/axios.config';
import authHeader from '../auth/auth-header';

// Call authHeaeder auxiliar function to generate the request`s headers to includ the bearer token
const getAllCandidatos = (query = '') => {
  if (query === '') {
    return axiosConfig.get('api/candidatos', { headers: authHeader() });
  }
  console.log(query);
  return axiosConfig.get(`api/candidatos/?${query}`, { headers: authHeader() });
};

const getCandidatosById = (id) => {
  return axiosConfig.get(`api/candidatos/${id}`, { headers: authHeader() });
};

// TODO finics the CRUD services
const createCandidato = (candidato) => {
  return axiosConfig.post('api/candidatos', candidato, { headers: authHeader() });
};

const updateCandidato = ({ field, id }) => {
  const name = Object.keys(field)[0];
  const value = Object.values(field)[0];
  const formData = new FormData();
  console.log(name, value);
  console.log('Service, candidato form data: ');
  formData.append(name, value);
  return axiosConfig.put(`api/candidatos/${id}`, formData, { headers: authHeader() });
};

const updateCandidatoTag = ({ id, tecnologias }) => {
  console.log(id, tecnologias);
  const data = {
    tecnologias,
  };
  console.log(data);
  return axiosConfig.put(`api/candidatos/${id}`, data, { headers: authHeader() });
};

const candidatosService = {
  getAllCandidatos,
  getCandidatosById,
  createCandidato,
  updateCandidato,
  updateCandidatoTag,
};

export default candidatosService;
