import React, { useState } from 'react';
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
import { useNavigate, Link as RouteLink, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateNewPassword = () => {
  const { token } = useParams();
  const notify = (msg, method = "error") => toast[method](msg);


  const { data, error, loading, execute } = useAxios("post", "/auth/create-new-password");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    const createNewPassword = {
      password,
      token
    };


    console.log('1', password);
    console.log('2', confirmPassword);
    if (password !== confirmPassword) {
      notify("Password doesn't match", "error");
    } else {
      execute(createNewPassword);
    }

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
    notify("Password changed successfully!", "info")
    navigate("/login");
  }

  return (


    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <CssBaseline />
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Create new password
        </Typography>
        <br></br>
        Your new password must be different from previous used passwords.
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="password"
            autoFocus

          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            autoComplete="password"
            autoFocus

          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
        </Box>
      </Paper>

    </Container>

  );
}

export default CreateNewPassword;