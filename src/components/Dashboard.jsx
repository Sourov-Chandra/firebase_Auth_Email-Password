import React from 'react'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const {currentUser} = useAuth();
  console.log("Current User from Deshboard: ", currentUser);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard