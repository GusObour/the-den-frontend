import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element, adminOnly, ...rest }) => {
  const { auth } = React.useContext(AuthContext);

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !auth.user.admin) {
    return <Navigate to="/user" />;
  }

  return element;
};

export default ProtectedRoute;
