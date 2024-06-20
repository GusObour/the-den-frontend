import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isLoggedIn: false, user: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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
      navigate('/login');
    }
  }, [navigate]);

  const refreshToken = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/refresh-token`);
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
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, credentials);
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

  const logout = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/logout`).then(() => {
      handleLogout();
    });
  };

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, user: null });
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now() + 5 * 60 * 1000) {
            setIsModalOpen(true);
          }
          if (decoded.exp * 1000 < Date.now()) {
            refreshToken();
          }
        } catch (e) {
          console.error('Token decoding failed:', e);
          handleLogout();
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="Modal__Content bg-gray-900 p-6 rounded-lg shadow-lg text-white max-w-lg mx-auto my-20"
        overlayClassName="Modal__Overlay fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-6">Session Expiring</h2>
        <p className="mb-4">Your session is about to expire. Would you like to stay logged in?</p>
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
