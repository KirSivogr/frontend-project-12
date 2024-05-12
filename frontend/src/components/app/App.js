import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import MainPage from '../pages/ChatPage';
import ErrorPage from '../pages/ErrorPage';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from '../../provider/authProvider';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
