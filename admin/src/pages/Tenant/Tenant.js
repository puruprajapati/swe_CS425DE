import faker from "@faker-js/faker";
import {
  Box,
  Divider,
  Grid,
  Paper,
  Typography,
  Modal,
  Button,
  TextField,
} from "@mui/material";
import StatusView, { StatusVariants } from "components/StatusView";
import Layout from "pages/Layout";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../../api/userAxios";
import { ToastContainer, toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../../components/Loading";
import Header from "../../components/Header";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Tenant = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [userState, setUserState] = useState({
    firstName: "",
    lastName: "",
  });
  const notify = (msg, method = "error") => toast[method](msg);

  const { data, error, loading, execute, queryParam } = useAxios(
    "get",
    "/users/" + id
  );

  const {
    data: updateData,
    error: updateError,
    loading: updateLoading,
    execute: udpateExecute,
    queryParam: udpateQueryParam,
  } = useAxios("post", "/auth/update/" + id);

  useEffect(() => {
    if (data) {
      setUserState({
        firstName: data?.data?.firstName,
        lastName: data?.data?.lastName,
      });
    }
  }, [data]);

  useEffect(() => {
    if (updateData) {
      notify("User update successfully!", "success");
      handleDialogClose();
      execute();
    }
  }, [updateData]);

  if (loading) {
    return (
      <>
        <Header />
        <Loading loading={loading} />
      </>
    );
  }

  if (updateLoading) {
    return (
      <>
        <Header />
        <Loading loading={updateLoading} />
      </>
    );
  }

  const handleSubmit = (event) => {
    udpateExecute(userState);
  };

  const handleDialogClose = () => {
    if (open) {
      setOpen(false);
    }
  };

  if (updateError) {
    notify(updateError);
  }

  return (
    <Layout title="Tenant">
      <Paper>
        <div style={{ padding: "20px 20px 0px 20px" }}>
          <Typography component="h1" variant="h5">
            Tenant Infromation
          </Typography>
        </div>
        <Grid
          container
          direction="row"
          spacing={2}
          style={{
            margin: "0px 20px 20px 20px",
            padding: "20px",
          }}
        >
          <Grid item xs={12}>
            <Typography>Id: {data.data.id}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>First Name: {data.data.firstName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Last Name: {data.data.lastName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Email: {data.data.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Gender: {data.data.gender}</Typography>
          </Grid>
        </Grid>
        <div className="edit-btn">
          <Button onClick={() => setOpen(!open)} variant="contained">
            <EditIcon /> Edit
          </Button>
        </div>
      </Paper>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
          <Typography component="h1" variant="h5">
            Update
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="Id"
              name="id"
              autoComplete="id"
              autoFocus
              size="small"
              disabled={true}
              value={data.data.id}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              size="small"
              value={userState.firstName}
              onChange={(e) => {
                setUserState({ ...userState, firstName: e.target.value });
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lastName"
              autoFocus
              size="small"
              value={userState.lastName}
              onChange={(e) => {
                setUserState({ ...userState, lastName: e.target.value });
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              size="small"
              disabled={true}
              value={data.data.email}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="gender"
              label="Gender"
              name="gender"
              autoComplete="gender"
              autoFocus
              size="small"
              disabled={true}
              value={data.data.gender}
            />

            <div className="btn-list">
              <Button sx={{ mt: 3, mb: 2 }} onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Update
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </Layout>
  );
};

export default Tenant;
