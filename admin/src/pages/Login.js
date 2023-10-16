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
import { AuthContext } from "context/AuthContext";
import { useNavigate, Link as RouteLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxios from "axios-hooks";
import Loading from "components/Loading";
import ROLE from "auth/Role";
import axios from "axios";

const Login = () => {
  const notify = (msg) => toast.error(msg);
  const { isSignedIn, setSignedIn, setRole } = useContext(AuthContext);

  const [{ data, loading: loginLoading, error }, executeLogin] = useAxios(
    {
      url: "/auth/login",
      method: "POST",
    },
    { manual: true }
  );

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    executeLogin({
      data: { email: form.get("email"), password: form.get("password") },
    });
  };

  useEffect(() => {
    if (isSignedIn) navigate("/");
  }, [isSignedIn, navigate]);

  useEffect(() => {
    if (error?.message) {
      notify(error?.message);
    }
  }, [error?.message, notify]);

  useEffect(() => {
    if (data) {
      const {
        tokenResponse: { access_token },
        user: { role },
      } = data.data;

      if (role.roleName === ROLE.Landlord || role.roleName === ROLE.Admin) {
        // console.log('roleName', role.roleName)
        setRole(role.roleName);
        setSignedIn(true);
        localStorage.setItem("token", access_token);
        localStorage.setItem("user", JSON.stringify(data.data.user));

        navigate("/");
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        notify("You don't have permission to access the website");
      }
    }
  }, [data, navigate, setRole, setSignedIn]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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
              <Link to="/forgotpassword" component={RouteLink} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            {/* <Grid item>
              <Link to="/register" component={RouteLink} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
          </Grid>
        </Box>
      </Box>
      <Loading loading={loginLoading} />
    </Container>
  );
};

export default Login;
