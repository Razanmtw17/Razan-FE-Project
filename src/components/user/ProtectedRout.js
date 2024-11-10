import React from 'react'
import { Navigate } from 'react-router-dom'
export default function ProtectedRout({
  isUserDataLoading,
  isAuthenticated,
  element,
  userDate,
  shouldCheckAdmin,
}) {
  if (isUserDataLoading) {
    return <div>Loading...</div>;
  }
  if(shouldCheckAdmin){
     return isAuthenticated && userDate.role === "Admin" ? (
       element
     ) : (
       <Navigate to="/login" />
     );
  }
  return isAuthenticated ? element : <Navigate to="/login" />;
}
