import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate("")
    const [error, setError] = useState("")

    const auth = getAuth();

    const handleLogin = (e) =>{
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            alert("User Login Successful");
            console.log("User: ", user);
            navigate("/")
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            setError(
              "Invalid user Email or Password! Please enter correct one"
            );
          });
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Please Login
        </h1>

        <form action="" onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className=" block mb-2 text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outlinone focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className=" block mb-2 text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outlinone focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
          </div>

          {error && (
            <p className='text-sm italic text-red-500'>{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 text-white rounded-md"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account? Please
          <Link to="/register" className="text-blue-600 hover:underline">
            {" "}
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login