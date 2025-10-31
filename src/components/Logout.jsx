import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';
import AuthState from './AuthState';
import { useAuth } from '../context/AuthContext';


const Logout = () => {
    const auth = getAuth(app);

    const {currentUser} = useAuth()

    const handleLogout = ()=>{
        signOut(auth)
          .then(() => {
            // Sign-out successful.
            alert("User signed out successfully.")
          })
          .catch((error) => {
            // An error happened.
            console.log(error.message);
          });
    }
  return (
    <div className='mt-6'>
      <button onClick={handleLogout} className="px-4 py-2 text-white bg-sky-600 rounded-md ">Logout</button>

      <AuthState />
    </div>
  );
}

export default Logout