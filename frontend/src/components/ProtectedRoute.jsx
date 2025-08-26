import React from 'react';
// import useIsLoggedIn from '../hooks/useIsLoggedIn';
import { Navigate } from 'react-router-dom';
import useIsLoggedIn from '../hooks/useIsLoggedin';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
