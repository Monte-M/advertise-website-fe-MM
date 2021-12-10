import React, { useState, useContext } from "react";
import toast from "react-hot-toast";

export const AuthContext = React.createContext({
  email: "",
  id: "",
  token: "",
});

AuthContext.displayName = "AuthContext";

const AuthProvider = (props) => {
  const [email, setEmail] = useState(localStorage.getItem("userEmail"));
  const [id, setId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("userToken"));

  const login = (email, token, id) => {
    setEmail(email);
    setId(id);
    setToken(token);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userId", id);
    localStorage.setItem("userToken", token);
    toast.success(email + " logged in");
  };

  const logout = () => {
    setEmail("");
    setId("");
    setToken(null);
    localStorage.setItem("userEmail", "");
    localStorage.setItem("userId", "");
    localStorage.setItem("userToken", "");
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
