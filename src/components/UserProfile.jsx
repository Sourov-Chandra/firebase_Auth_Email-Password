import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router';

const UserProfile = () => {

    const {currentUser} = useAuth()
    console.log(currentUser);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-sm mx-auto shadow-sm rounded-2xl py-12 px-8 space-y-4">
        <h1 className="text-3xl font-bold">User Profile Card</h1>
        <h2>Welcome, {currentUser?.displayName || "User"}</h2>

        <div className="space-y-2">
          <p className="text-sm ">Email: {currentUser?.email ? currentUser.email : "N/A" }</p>
          {currentUser?.photoURL && 
            <img src={currentUser?.photoURL} alt="User Photo" className="w-24 h-24 rounded-full object-cover"  />
          }
          <p className="text-sm ">
            Email Varified: {currentUser?.emailVerified ? "Yes" : "No"}
          </p>
          <p className="text-sm ">User Id: {currentUser?.uid}</p>
        </div>

        <div>
          <Link to='/user-update' className='px-4 py-2 rounded bg-blue-400 text-white'>Edit Profile</Link>
        </div>

      </div>
    </div>
  );
}

export default UserProfile