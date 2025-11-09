import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import app from '../firebase/firebase.config';
import { getAuth, updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router';

const UpdatePassword = () => {
    const [message, setMessage] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const auth = getAuth(app);

    const handlePasswordUpdate = async (e) => {
      e.preventDefault();

      if (newPassword !== confirmPassword) {
        setMessage("Passwords do not match");
        return;
      }
      if (newPassword.length < 6) {
        setMessage("Password must be at least 6 characters long");
        return;
      }

      const user = auth.currentUser;
      console.log(user);
      if(user) {
        try {
          await updatePassword(user, newPassword)
          setMessage("Password updated successfully");
          navigate("/")
        } catch (error) {
          console.log(error.message);
          setMessage("Failed to update password! Try again later")
        }
      }
      else {
        setMessage("No Authenticated user found.");
        alert("Please Login!");
        navigate("/login");
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 w-full max-w-md shadow-md rounded-lg space-y-6">
        <h2 className=" text-2xl text-center font-bold text-gray-800">
          Reset Password
        </h2>
        {message && (
          <p
            className={`p-2 text-center ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handlePasswordUpdate} action="" className="space-y-4">
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded-md focus:outline-1 focus:ring-blue-400 focus:border-transparent"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute bottom-3 right-0 flex items-center pr-3 cursor-pointer"
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-600" />
              ) : (
                <FaEye className="text-gray-600" />
              )}
            </div>
          </div>
          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border rounded-md focus:outline-1 focus:ring-blue-400 focus:border-transparent"
            />
            <div
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute bottom-3 right-0 flex items-center pr-3 cursor-pointer"
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="text-gray-600" />
              ) : (
                <FaEye className="text-gray-600" />
              )}
            </div>
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 rounded-lg text-white py-2">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword