import { createContext } from "react";

export const AuthContext = createContext({
  isSignedIn: false,
  setSignedIn: () => {},
  role: null,
  setRole: () => {},
  user: {},
  setUser: () => {},
});
