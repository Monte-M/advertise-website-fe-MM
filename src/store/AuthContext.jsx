import React, { useState, useContext } from "react";
import toast from "react-hot-toast";

export const AuthContext = React.createContext({
  email: "",
  id: "",
  token: "",
});

AuthContext.displayName = "AuthContext";

const AuthProvider = (props) => {
  const [email, setEmail] = useState(sessionStorage.getItem("userEmail"));
  const [id, setId] = useState(sessionStorage.getItem("userId"));
  const [token, setToken] = useState(sessionStorage.getItem("userToken"));

  const login = (email, token, id) => {
    setEmail(email);
    setId(id);
    setToken(token);
    sessionStorage.setItem("userEmail", email);
    sessionStorage.setItem("userId", id);
    sessionStorage.setItem("userToken", token);
    toast.success(email + " logged in");

    autoLogout();
  };

  const autoLogout = () => {
    setTimeout(() => {
      logout();
    }, 3500000);
  };

  const logout = () => {
    setEmail("");
    setId("");
    setToken(null);
    sessionStorage.setItem("userEmail", "");
    sessionStorage.setItem("userId", "");
    sessionStorage.setItem("userToken", "");
    toast.success("You have logged out");
  };

  const isLoggedIn = token;

  const authCtx = {
    login,
    logout,
    email,
    token,
    id,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={authCtx}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export function useAuthCtx() {
  return useContext(AuthContext);
}
