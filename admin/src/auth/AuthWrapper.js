import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, Navigate } from "react-router-dom";
import _ from 'lodash';

const AuthWrapper = (props) => {
  const { isSignedIn, role, setSignedIn, } = useContext(AuthContext);
  const location = useLocation();
  console.log(props.role, role);
  if (!isSignedIn || !_.includes(props.role, role)) {
    setSignedIn(false)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return props.children;
};
export default AuthWrapper;
