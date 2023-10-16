import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxios from "axios-hooks";
import Loading from "components/Loading";
import { useEffect } from "react";

const ForgotPassword = () => {
  const notify = (msg) => toast.error(msg);
  const alert = (msg, onClose) => toast.info(msg, onClose);

  const [{ data, loading, error }, execute] = useAxios(
    {
      url: "/auth/reset-password-by-user",
      method: "POST",
    },
    { manual: true }
  );

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const registerRequest = {
      email: formData.get("email"),
    };
    execute({
      data: registerRequest,
    });
  };

  useEffect(() => {
    if (error?.message) {
      notify(error?.message);
    }
  }, [error?.message, notify]);

  useEffect(() => {
    if (data) {
      alert("Mail has been sent to you.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [data, navigate]);

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <CssBaseline />
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Forgot Password
        </Typography>
        <br></br>
        Enter the email associated with your account and we'll send an email
        with instructions to reset your password.
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
      <Loading loading={loading} />
    </Container>
  );
};

export default ForgotPassword;
