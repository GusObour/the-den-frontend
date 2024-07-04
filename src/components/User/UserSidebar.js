import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaCog, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

const UserSidebar = () => {
  const { auth, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className="md:hidden rounded flex items-start justify-between p-4 bg-black-2 text-white">
        <button onClick={toggleSidebar}>
          {sidebarOpen ? <FaTimes className="text-white" /> : <FaBars className="text-white" />}
        </button>
      </div>

      <div className={`md:block ${sidebarOpen ? 'block' : 'hidden'} rounded bg-black-2 text-white w-64 py-8 px-4 h-screen md:h-auto md:relative fixed inset-y-0 left-0 z-50`}>
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-3xl font-bold text-pretty">Welcome, {auth.user.fullName}</h2>
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/user/appointments" className="flex items-center">
                <FaCalendarAlt className="mr-3" /> Appointments
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/user/settings" className="flex items-center">
                <FaCog className="mr-3" /> Settings
              </Link>
            </li>
            <li className="mt-8">
              <Link onClick={logout} className="flex items-center text-red-500">
                <FaSignOutAlt className="mr-3" /> Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default UserSidebar;
