import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Admin/Sidebar';
import Appointments from './Admin/Appointments';
import Availability from './Admin/Availability';
import AdminStats from './Admin/AdminStats';
import Settings from './Settings';

const AdminDashboard = () => {

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 bg-white dark:bg-gray-800 text-black dark:text-white">
        <Routes>
          <Route path="stats" element={<AdminStats />} />
          <Route path="/" element={<Navigate to="stats" />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="availability" element={<Availability />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
