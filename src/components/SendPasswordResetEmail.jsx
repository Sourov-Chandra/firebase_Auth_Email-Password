import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import app from '../firebase/firebase.config';

const SendPasswordResetEmail = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)

    const auth = getAuth(app);

    const handlePasswordReset = (e) => {
        e.preventDefault();
        if(!email) {
            setMessage("Please enter your email address");
            setIsSuccess(false);
            return;
        }
        try {
            sendPasswordResetEmail(auth, email)
              .then(() => {
                // Password reset email sent!
                setMessage("Password rest email sent! Please check your inbox")
                setIsSuccess(true);
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("getting an error to submit form", errorMessage);
                // ..
              });
            
        } catch (error) {
            setMessage("Failed to send reset email. Please check your email address and try again later");
            setIsSuccess(false)
        }
    }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6'>
            <h2 className='text-2xl font-bold text-center'>Reset Your Password</h2>
            {
                message && <p className={`p-2 text-center ${isSuccess ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}>{message}</p>
            }
            <form className='space-y-4' onSubmit={handlePasswordReset }>
                <label htmlFor="" className='block mb-2 text-sm font-medium text-gray-700'>Email Address</label>
                <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email" id='emailAddress' name='emailAddress' placeholder='Enter your email' className='w-full px-4 py-2  border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent'/>

                <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white w-full px-4 py-2  rounded-md'>Send Reset Email</button>
            </form>
        </div>
    </div>
  )
}

export default SendPasswordResetEmail