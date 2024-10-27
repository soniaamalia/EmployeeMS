import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
    return localStorage.getItem("valid") ? (
      <React.Fragment key="private-route-children">
        {children}
      </React.Fragment>
    ) : (
      <Navigate to="/" />
    );
  };

export default PrivateRoute