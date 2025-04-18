import { createContext, useEffect, useState } from "react";

const AuthStore = createContext({
  email: "",
  password: "",
  isLoggedIn: false,
  login: (email, password) => {},
  logout: () => {},
});
export default AuthStore;

export const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // console.log("effect");
    const token = localStorage.getItem("token");
    if (token == "true") {
      setIsLoggedIn(true);
    }
  }, []);
  // console.log("test");
  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
    localStorage.setItem("token", "true");
    return true;
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };
  return (
    <AuthStore.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {children}
    </AuthStore.Provider>
  );
};
