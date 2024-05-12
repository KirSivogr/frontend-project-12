import { useMemo, useState } from 'react';
import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }) => {
  const userCurrent = localStorage.getItem('user');
  const [user, setUser] = useState(userCurrent);

  const logIn = (registrationData) => {
    localStorage.setItem('user', registrationData.username);
    localStorage.setItem('token', registrationData.token);

    setUser(registrationData.username);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(false);
  };

  const getAuthHeader = () => {
    const userCurToken = localStorage.getItem('token');
    return userCurToken;
  };

  const value = useMemo(() => ({
    user, logIn, logOut, getAuthHeader,
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
