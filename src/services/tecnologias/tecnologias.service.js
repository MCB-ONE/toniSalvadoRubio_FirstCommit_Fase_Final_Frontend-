import axiosConfig from '../../utils/axios.config';
import authHeader from '../auth/auth-header';

const getAllTecnologias = () => {
  return axiosConfig.get('api/tecnologias', { headers: authHeader() });
};

const getTecnologiasById = (id) => {
  return axiosConfig.get(`api/tecnologias/${id}`, { headers: authHeader() });
};
// TODO finics the CRUD services

const tecnologiasService = {
  getAllTecnologias,
  getTecnologiasById,
};

export default tecnologiasService;
