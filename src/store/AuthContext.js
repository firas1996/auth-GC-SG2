import { createContext } from "react";

const AuthStore = createContext({
  email: "",
  password: "",
  isLoggedIn: false,
  login: (email, password) => {},
  logout: () => {},
});
export default AuthStore;
