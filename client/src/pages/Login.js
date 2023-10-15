import React, { useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useAxios } from "../api/useAxios";
import Loading from "../components/Loading";
import { AuthContext } from "context/AuthContext";
import { useNavigate, Link as RouteLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ROLE from "auth/Role";
import { ReactComponent as Logo } from "../assets/img/logo-white.svg";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Login = () => {
  const notify = (msg) => toast.error(msg);
  const { isSignedIn, setSignedIn, setUser } = useContext(AuthContext);

  const { data, error, loading, execute } = useAxios("post", "/auth/login");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    execute({ email: form.get("email"), password: form.get("password") });
  };

  useEffect(() => {
    if (isSignedIn) navigate("/");
  }, [isSignedIn, navigate]);

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (error) {
    notify(error);
  }

  if (data) {
    if (data.data.user.role.roleName === ROLE.Tenant) {
      localStorage.setItem("token", data.data.tokenResponse.access_token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      setUser(data.data.user);
      setSignedIn(true);
      navigate("/");
    } else {
      notify("Please use admin portal to login this account!");
      navigate("/login");
    }
  }

  return (
    <div className="login-container">
      <CssBaseline />
      <div className="side-container">
        <Box className="login-left">
          <img
            className="login-img"
            src="https://images.unsplash.com/photo-1623298317883-6b70254edf31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="title login "
          />
          <div className="login-img-text">
            <div className="logo" style={{ marginBottom: "20px" }}>
              <Logo />
              <div className="logo-text">GigaBits</div>
            </div>
            <div className="logo-text text">Find your next home with us!</div>
          </div>
        </Box>
        <Box className="login-right" sx={{}}>
          <Typography
            component="h1"
            variant="h5"
            style={{ fontSize: "20px", fontWeight: "bold" }}
          >
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  to="/forgotpassword"
                  component={RouteLink}
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" component={RouteLink} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <div style={{ position: "absolute", bottom: "20px" }}>
              <Button variant="text" onClick={() => navigate("/")}>
                <ArrowBackIosIcon />
                Back to Home
              </Button>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Login;
