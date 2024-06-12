import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    admin: false,
    agreeToSms: false,
  });
  const [headShotFile, setHeadShotFile] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({ ...user, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFileChange = (e) => {
    setHeadShotFile(e.target.files[0]);
  };

  const validateInputs = () => {
    if (validator.isEmpty(user.fullName)) {
      return 'Full name is required';
    }
    if (!validator.isEmail(user.email)) {
      return 'Invalid email format';
    }
    if (!validator.isStrongPassword(user.password)) {
      return 'Password must be at least 8 characters long and contain a number and a special character';
    }
    if (user.phoneNumber && !validator.isMobilePhone(user.phoneNumber)) {
      return 'Invalid phone number';
    }
    if (!user.agreeToSms) {
      return 'You must agree to receive text messages from The Den';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const formData = new FormData();
    formData.append('fullName', user.fullName);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('phoneNumber', user.phoneNumber);
    formData.append('admin', user.admin);
    formData.append('agreeToSms', user.agreeToSms);
    if (headShotFile) {
      formData.append('headShot', headShotFile);
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('User registered successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed!');
    }
  };

  return (
    <div className="container mx-auto py-20 px-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-8 text-center text-black-2">Register</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleInputChange}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
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
            value={user.password}
            onChange={handleInputChange}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputChange}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Agree to receive text messages</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="agreeToSms"
              checked={user.agreeToSms}
              onChange={handleInputChange}
              className="mr-2"
              required
            />
            <span>Yes</span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Upload a profile picture</label>
          <input
            type="file"
            name="headShot"
            onChange={handleFileChange}
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue"
          />
        </div>
        <button type="submit" className="bg-blue text-white py-2 px-4 w-full rounded hover:bg-light-blue transition duration-200">
          Register
        </button>
        <p className="text-center mt-4">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;