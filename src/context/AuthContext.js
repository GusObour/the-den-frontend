import React, { createContext, useState, useEffect, useRef } from 'react';
import api from './AxiosInterceptors';
import {jwtDecode} from 'jwt-decode';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from 'react-modal';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isLoggedIn: false, user: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTimer, setModalTimer] = useState(60); // 60 seconds timer
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setAuth({ isLoggedIn: true, user: decoded });
        } else {
          refreshToken();
        }
      } catch (e) {
        console.error('Invalid token:', e);
        localStorage.removeItem('token');
        navigate('/login');
      }
    } else {
      if (!['/login', '/register', '/'].includes(location.pathname)) {
        navigate('/login');
      }
    }
  }, [navigate, location.pathname]);

  const refreshToken = async () => {
    try {
      const response = await api.post(`/auth/refresh-token`);
      const { token } = response.data;
      const decoded = jwtDecode(token);
      setAuth({ isLoggedIn: true, user: decoded });
      localStorage.setItem('token', token);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Refresh token failed:', error);
      handleLogout();
    }
  };

  const login = async (credentials) => {
    try {
      const response = await api.post(`/auth/login`, credentials);
      const { token } = response.data;
      const decoded = jwtDecode(token);
      setAuth({ isLoggedIn: true, user: decoded });
      localStorage.setItem('token', token);
      return decoded;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid username or password');
    }
  };

  const logout = async () => {
    try {
      await api.post(`/auth/logout`);
      handleLogout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, user: null });
    localStorage.removeItem('token');
    navigate('/login');
    setIsModalOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now() + 5 * 60 * 1000) {
            setIsModalOpen(true);
            setModalTimer(60);
          }
          if (decoded.exp * 1000 < Date.now()) {
            refreshToken();
          }
        } catch (e) {
          console.error('Token decoding failed:', e);
          handleLogout();
        }
      }
    }, 60000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      timerRef.current = setInterval(() => {
        setModalTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isModalOpen) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isModalOpen]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="Modal__Content bg-gray-900 p-6 rounded-lg shadow-lg text-white max-w-lg mx-auto my-20"
        overlayClassName="Modal__Overlay fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-6">Session Expiring</h2>
        <p className="mb-4">Your session is about to expire. Would you like to stay logged in?</p>
        <p className="mb-4">Time remaining: {modalTimer} seconds</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={refreshToken}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Stay Logged In
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </Modal>
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
