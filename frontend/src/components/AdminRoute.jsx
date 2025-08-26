import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants';
import api from '../api';

const AdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        // Check if user is admin by making a request to get user profile
        const response = await api.get('/users/me/');
        const user = response.data;
        
        console.log("AdminRoute - user data:", user);
        setIsAdmin(user.is_staff || user.is_admin);
      } catch (err) {
        console.error("AdminRoute - error checking admin status:", err);
        setError(err.response?.data?.message || 'Failed to check admin status');
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  console.log("AdminRoute - final state:", { isAdmin, isLoading, error });

  if (isLoading) {
    return <div>Checking admin status...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isAdmin) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default AdminRoute;
