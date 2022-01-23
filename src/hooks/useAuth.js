import { useSelector } from 'react-redux';

const useAuth = () => {
  const user = useSelector((state) => state.auth);
  return user && user.isLoggedIn;
};

export default useAuth;
