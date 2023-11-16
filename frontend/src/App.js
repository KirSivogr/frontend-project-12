import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpPage from "./components/LoginPage";
import MainPage from './components/ChatPage'
import ErrorPage from "./components/ErrorPage";
import AuthContext from './contexts/AuthContext';
import {useMemo, useState} from "react";

function App () {
    const AuthProvider = ({ children }) => {
        const currentUser = JSON.parse(localStorage.getItem('token'));
        const initState = currentUser ? true : false;
        const [loggedIn, setLoggedIn] = useState(initState);
        const logIn = () => setLoggedIn(true);
        const logOut = () => {
            localStorage.removeItem('token');
            setLoggedIn(false);
        };

        const getAuthHeader = () => {
            const userId = JSON.parse(localStorage.getItem('token'));

            if (userId && userId.token) {
                return { Authorization: `Bearer ${userId.token}` };
            }

            return {};
        };

        const value = useMemo(() => ({
            loggedIn, logIn, logOut, getAuthHeader,
        }), [loggedIn]);

        return (
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        );
    };

  return (
      <AuthProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="login" element={<SignUpPage />} />
                  <Route path="/" element={<MainPage />} />
                  <Route path="*" element={<ErrorPage />} />
              </Routes>
          </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
