import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import validator from 'validator';

const Login = () => {
  const { login, auth } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoggedIn) {
      if (auth.user.admin) {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    }
  }, [auth, navigate]);

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    if (!validator.isEmail(credentials.email)) {
      return 'Invalid email format';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validationError = validateInputs();
      if (validationError) {
        toast.error(validationError);
        return;
      }

      const user = await login(credentials);
      toast.success('Successfully logged in!');
      if (user.admin) {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (error) {
      setError('Invalid email or password');
      toast.error('Login failed!');
    }
  };

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-black-2">Login</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue"
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="bg-blue text-white py-2 px-4 w-full rounded hover:bg-light-blue transition duration-200">Login</button>
        <p className="text-center mt-4">
          Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
