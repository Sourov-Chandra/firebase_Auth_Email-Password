import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth()
  if (loading) {
    return (
      <div
        class="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
      ></div>

    )
  }
  if (currentUser) {
    return children;
  }
  return (
    <Navigate to="/login" replace />
  )
}

export default PrivateRoute