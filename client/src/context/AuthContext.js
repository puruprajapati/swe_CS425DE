import { createContext } from "react";

export const AuthContext = createContext({
  isSignedIn: false,
  setSignedIn: () => {},
  role: "User",
  setRole: () => {},
  user: {},
  setUser: () => {},
});
