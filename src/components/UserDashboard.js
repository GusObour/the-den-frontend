import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './User/UserSidebar';
import UserAppointments from './User/UserAppointments';
import Settings from './Settings';

const UserDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 bg-white dark:bg-gray-800 text-black dark:text-white">
        <Routes>
          <Route path="appointments" element={<UserAppointments />} />
          <Route path="settings" element={<Settings />} />
          <Route path="/" element={<Navigate to="settings" />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserDashboard;
