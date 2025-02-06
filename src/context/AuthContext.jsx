/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import { useEffect, useState, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null); 
  console.log("userToken 1 side", token);

  useEffect(() => {
    const isToken = Cookies.get("token") || ""; 
    if (isToken !== token) {
      setToken(isToken); 
      console.log("isToken inside useEffect", isToken);
    }
  }, [token]);

  console.log("userToken outside useEffect", token);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
