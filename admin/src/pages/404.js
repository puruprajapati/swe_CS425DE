import React from "react";
import Button from "@mui/material/Button";
import "../assets/css/app/notfound.css";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { Grid } from "@mui/material";

const NotFound = () => {
  return (
    <Layout isHideLogout={true}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "80vh" }}
      >
        <div class="notfound container">
          <div class="gif">
            <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
          </div>
          <div class="content">
            <h1 class="main-heading">This page is gone.</h1>
            <p>
              ...maybe the page you're looking for is not found or never
              existed.
            </p>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button variant="contained" style={{ boxShadow: "none" }}>
                Back to home <i class="far fa-hand-point-right"></i>
              </Button>
            </Link>
          </div>
        </div>
      </Grid>
    </Layout>
  );
};

export default NotFound;
