import React, { useContext } from "react";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import "./index.css";
import Filter from "../Filter";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { AuthContext } from "context/AuthContext";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";

const Header = ({ type = "default", onFilter = () => {} }) => {
  const { isSignedIn, setSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="header">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="logo">
          <Logo />
          <div className="logo-text">GigaBits</div>
        </div>
      </Link>
      <div className="right">
        {type === "filter" && <Filter onFilter={onFilter} />}
        {isSignedIn ? (
          <>
            <div>
              <Button
                variant="text"
                onClick={() => {
                  setSignedIn(false);
                  localStorage.removeItem("token");
                }}
              >
                <LogoutIcon /> Logout
              </Button>
              <Button
                variant="text"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <PersonIcon /> Profile
              </Button>
            </div>
          </>
        ) : (
          <div>
            <Button
              variant="text"
              onClick={() => {
                navigate("/login");
              }}
            >
              <LoginIcon style={{ marginRight: "10px" }} />
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
