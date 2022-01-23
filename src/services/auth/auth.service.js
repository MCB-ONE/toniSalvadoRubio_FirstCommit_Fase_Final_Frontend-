import axiosConfig from '../../utils/axios.config';

const login = (email, password) => {
  return axiosConfig
    .post('authAPI/login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  login,
  logout,
};

export default authService;
