import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, Navigate } from "react-router-dom";

const AuthWrapper = (props) => {
  const { isSignedIn, role } = useContext(AuthContext);
  const location = useLocation();
  console.log(props.role);
  if (!isSignedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return props.children;
};
export default AuthWrapper;
