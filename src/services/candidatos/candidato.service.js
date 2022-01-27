import axiosConfig from '../../utils/axios.config';
import authHeader from '../auth/auth-header';

// Call authHeaeder auxiliar function to generate the request`s headers to includ the bearer token
const getAllCandidatos = () => {
  return axiosConfig.get('api/candidatos', { headers: authHeader() });
};

const getCandidatosById = (id) => {
  return axiosConfig.get(`api/candidatos/${id}`, { headers: authHeader() });
};
// TODO finics the CRUD services
const createCandidato = ({ candidato }) => {
  console.log('Service, candidato data: ');
  console.log(candidato);
  return axiosConfig.post('api/candidatos', candidato, { headers: authHeader() });
};

const candidatosService = {
  getAllCandidatos,
  getCandidatosById,
  createCandidato,
};

export default candidatosService;
