import React from 'react'
import { Link } from 'react-router';
import Logout from './components/Logout';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <>
        <div className="container mx-auto ">
          <nav className="py-24 mt-16 bg-slate-50">
            <ul className="flex justify-center items-center space-x-4 ">
              <li>
                <Link
                  to="/register"
                  className="px-6 py-2 rounded bg-blue-500 hover:bg-blue-700 text-white"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="px-6 py-2 rounded bg-blue-500 hover:bg-blue-700 text-white"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="px-6 py-2 rounded bg-blue-500 hover:bg-blue-700 text-white"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/user-profile"
                  className="px-6 py-2 rounded bg-blue-500 hover:bg-blue-700 text-white"
                >
                  UserProfile
                </Link>
              </li>
              <li>
                <Link
                  to="/update-password"
                  className="px-6 py-2 rounded bg-blue-500 hover:bg-blue-700 text-white"
                >
                  Reset Password
                </Link>
              </li>
            </ul>
          </nav>

          <Logout />
        </div>
      
    </>
  );
}

export default App