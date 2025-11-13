import React, { useState } from 'react'
import app from '../../firebase/firebase.config';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';

const SendSignInEmail = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("")

    const auth = getAuth(app);
    const actionCodeSettings = {
        url: 'http://localhost:5174/finish-signin',
        handleCodeInApp: true,
    }

    const handleSendSignInLink = async (e) => {
        e.preventDefault()
        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings)
            window.localStorage.setItem("emailForSignIn", email)
            setMessage("Sign-in link sent successfully to your email address. Please check your inbox")
        } catch (error) {
            console.error("Error sending email link", error.message)
            setMessage("Failed to send email link. Please try again")
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md  p-6 bg-white shadow-md rounded-2xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 my-6 rounded-lg">
          Sign with Email Link
        </h2>
        {
            message && <p className={`p-2 my-2 text-center ${message ? 'text-blue-400' : 'text-red-400'}`}>{message}</p>
        }

        <form
        onSubmit={handleSendSignInLink}
        action="" className='space-y-2'>
          <div className="space-y-3">
            <label className="block font-semibold text-gray-700">Email Address: </label>
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
          <button type='submit' className='w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 cursor-pointer'>Send Sign In Link</button>
        </form>
      </div>
    </div>
  );
}

export default SendSignInEmail