import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import app from '../../firebase/firebase.config';
import { useNavigate } from 'react-router';

const FinishSignIn = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const auth = getAuth(app);
    const navigate = useNavigate()

    useEffect(() => {
        if(!isSignInWithEmailLink(auth, window.location.href)){
            setMessage("Invalid or expired sign-in link!")
            return ;
        }
    }, [auth])

    const handleCompleteSignIn = async (e) => {
      e.preventDefault();
      const storeEmail = window.localStorage.getItem('emailForSignIn');
      const emailToUse = email || storeEmail;

      if(!emailToUse) {
        setMessage("Please provide the email address used to receive the sign-in link.")
        return;
      }

      try {
        const result = await signInWithEmailLink(
          auth,
          emailToUse,
          window.location.href
        );
        setMessage("Signing in successfully!")
        window.localStorage.removeItem("emailForSignIn");
        navigate("/dashboard")
      } catch (error) {
            console.error("Error completing sign in", error.message);
            setMessage("Failed to complete sign in. Please try again");
        
      }
    };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md  p-6 bg-white shadow-md rounded-2xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 my-6 rounded-lg">
          Complete Your Sign In
        </h2>
        {message && (
          <p
            className={`p-2 my-2 text-center ${
              message ? "text-blue-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleCompleteSignIn} action="" className="space-y-2">
          <div className="space-y-3">
            <label className="block font-semibold text-gray-700">
              Email Address:{" "}
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 focus:outline-none border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 cursor-pointer"
          >
            Complete Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default FinishSignIn