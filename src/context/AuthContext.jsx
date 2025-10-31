import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

const AuthContext = createContext();

export const useAuth = ()=> useContext(AuthContext);
const auth = getAuth(app);

export const AuthProvider = ({children})=>{

  const [currentUser, setCurrentUser] = useState(null)

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      /* console.log("Auth Provider is", user); */
      setCurrentUser(user)
    } 
  });
  return () => unsubscribe();

}, [auth])

  const value = {currentUser}
  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}