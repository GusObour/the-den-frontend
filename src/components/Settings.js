import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaSave, FaTrash, FaKey } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Settings = () => {
  const { auth } = useContext(AuthContext);
  console.log(auth);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    headShot: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [headShotFile, setHeadShotFile] = useState(null);

  useEffect(() => {
    if (auth.user) {
      setUser(auth.user);
    }
  }, [auth.user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleHeadShotChange = (e) => {
    setHeadShotFile(e.target.files[0]);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append('firstName', user.firstName);
    // formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('phoneNumber', user.phoneNumber);
    if (headShotFile) {
      formData.append('headShot', headShotFile);
    }

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/user/profile`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setUser(response.data);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New password and confirmation password do not match');
      return;
    }
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/user/change-password`, passwordData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success('Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error('Failed to change password');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        toast.success('Account deleted successfully');
        localStorage.removeItem('token');
        window.location.href = '/login';
      } catch (error) {
        toast.error('Failed to delete account');
      }
    }
  };

  return (
    <div className="bg-black-3 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-6">Account Settings</h2>
      <form onSubmit={handleUpdateProfile} className="space-y-6 mb-8">
        <div className="flex items-center mb-6">
          <img
            src={user.headShot || `${process.env.PUBLIC_URL}/default-headShot.png`}
            alt="headShot"
            className="w-16 h-16 rounded-full mr-4"
          />
          <label className="block text-gray-300">
            <span className="sr-only">Choose headShot</span>
            <input
              type="file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              onChange={handleHeadShotChange}
            />
          </label>
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            name="firstName"
            value={user.fullName}
            onChange={handleInputChange}
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue"
            required
          />
        </div>
        {/* <div>
          <label className="block text-gray-300 mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={user.fullName}
            onChange={handleInputChange}
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue"
            required
          />
        </div> */}
        <div>
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputChange}
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue"
          />
        </div>
        <div className="flex justify-between items-center">
          <button type="submit" className="bg-blue flex items-center text-white py-2 px-4 rounded hover:bg-light-blue transition duration-200">
            <FaSave className="mr-2" /> Update Profile
          </button>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-600 flex items-center text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
          >
            <FaTrash className="mr-2" /> Delete Account
          </button>
        </div>
      </form>

      <div className="border-t border-gray-500 pt-6">
        <h2 className="text-2xl font-bold mb-6">Change Password</h2>
        <form onSubmit={handleChangePassword} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue"
              required
            />
          </div>
          <button type="submit" className="bg-green-600 flex items-center text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200">
            <FaKey className="mr-2" /> Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
