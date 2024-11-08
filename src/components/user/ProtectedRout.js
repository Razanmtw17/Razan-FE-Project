import React from 'react'
import { Navigate } from 'react-router-dom'
export default function ProtectedRout({
  isUserDataLoading,
  isAuthenticated,
  element,
  userDate,
}) {
  if (isUserDataLoading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? element : <Navigate to="/login" />;
}
