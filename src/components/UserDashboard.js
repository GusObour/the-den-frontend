import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './User/UserSidebar';
import UserAppointments from './User/UserAppointments';
import Settings from './Settings';

const UserDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-white text-white">
        <Routes>
          <Route path="appointments" element={<UserAppointments />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default UserDashboard;
