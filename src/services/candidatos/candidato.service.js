import axiosConfig from '../../utils/axios.config';
import authHeader from '../auth/auth-header';

const getAllCandidatos = () => {
  return axiosConfig.get('api/candidatos', { headers: authHeader() });
};

const getCandidatosById = (id) => {
  return axiosConfig.get(`api/candidatos/${id}`, { headers: authHeader() });
};
// TODO finics the CRUD services

const candidatosService = {
  getAllCandidatos,
  getCandidatosById,
};

export default candidatosService;
