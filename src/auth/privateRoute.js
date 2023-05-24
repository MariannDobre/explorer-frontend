import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const PrivateRoute = ({ component: path, ...rest }) => {
  const [user] = useAuthState(auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
