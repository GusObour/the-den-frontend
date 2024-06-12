import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="h-screen bg-black-2 text-white w-64 py-8 px-4">
      <div className="flex items-center justify-center mb-8">
        <h2 className="text-3xl font-bold">Admin</h2>
      </div>
      <nav>
        <ul>
        <li className="mb-4">
            <Link to="/admin/stats" className="flex items-center">
              <FaCalendarAlt className="mr-3" /> Stats
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/appointments" className="flex items-center">
              <FaCalendarAlt className="mr-3" /> Appointments
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/availability" className="flex items-center">
              <FaCalendarAlt className="mr-3" /> Availability
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/settings" className="flex items-center">
              <FaCog className="mr-3" /> Settings
            </Link>
          </li>
          <li className="mt-8">
            <Link to="/logout" className="flex items-center text-red-500">
              <FaSignOutAlt className="mr-3" /> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
