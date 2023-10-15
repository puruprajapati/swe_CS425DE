import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useAxios } from "../api/useAxios";
import Loading from '../components/Loading';
import { AuthContext } from 'context/AuthContext';
import { useNavigate, Link as RouteLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const notify = (msg, method = "error") => toast[method](msg);

  const { data, error, loading, execute } = useAxios("post", "/auth/reset-password-by-user");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const registerRequest = {
      email: formData.get('email')
    };
    execute(registerRequest);
  };

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (error) {
    alert(error);
  }

  if (data) {
    notify("Mail has been sent to you.", "success");
    navigate("/login");
  }

  return (


    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <CssBaseline />
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Forgot Password
        </Typography>
        <br></br>
        Enter the email associated with your account and we'll send an email with instructions to reset your password.
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send Instructions
          </Button>
        </Box>
      </Paper>

    </Container>

  );
}

export default ForgotPassword;