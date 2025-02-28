/* eslint-disable react/prop-types */
import Cookies from "js-cookie";
import { useEffect, useState, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cookie, setCookie] = useState(Cookies.get("token") || null);

  useEffect(() => {
    if (cookie) {
      setCookie(cookie);
    }
  }, [cookie]);


  return (
    <AuthContext.Provider value={{ cookie, setCookie }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
