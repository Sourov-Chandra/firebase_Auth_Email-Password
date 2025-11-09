import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import app from "../firebase/firebase.config";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [message, setMessage] = useState("")

    // console.log('Email:', email);
    // console.log("Password: ", password);

    const auth = getAuth(app);
    //   console.log(auth);
    const handleRegister = (e) => {
        e.preventDefault();
        
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;

                sendEmailVerification(user)
                .then(() => {
                  setMessage("Registration successfully! A verification email has been sent to your email address.")
                  console.log("Varification has been sent to your email: ", user.email);
                }).catch(error => console.error("Error sending varification email", error.message))
                ;
                setTimeout(() => {
                  alert("User Registration Successful");
                  navigate("/login");
                  console.log("User Signed: ", user);
                }, 5000);
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    };
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-md space-y-6">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Please Register
          </h1>

          <form action="" onSubmit={handleRegister} className="space-y-4">
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

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 text-white rounded-md"
            >
              Sign Up
            </button>

            {/* Social Login */}
            <div className=" text-center space-y-3">
              <p className="text-gray-600">Or sign up with</p>

              <div className="flex justify-center space-x-4">
                <button className="flex items-center px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white space-x-2">
                  <FaGoogle />
                  <span>Google</span>
                </button>
                <button className="flex items-center px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white space-x-2">
                  <FaFacebook />
                  <span>Facebook</span>
                </button>
                <button className="flex items-center px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white space-x-2">
                  <FaGithub />
                  <span>Github</span>
                </button>
              </div>
            </div>
          </form>
          <p className="text-sm text-center text-gray-600">
            Already have an account? Please
            <Link to="/login" className="text-blue-600 hover:underline">
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    );
};

export default Register;
