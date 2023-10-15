import React, { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import "../assets/css/app/notfound.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const NotFound = () => {
  return (
    <>
      <Header />
      <div style={{ marginBottom: "20px", minHeight: "550px" }}></div>
      <div class="notfound container">
        <div class="gif">
          <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
        </div>
        <div class="content">
          <h1 class="main-heading">This page is gone.</h1>
          <p>
            ...maybe the page you're looking for is not found or never existed.
          </p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="contained" style={{ boxShadow: "none" }}>
              Back to home <i class="far fa-hand-point-right"></i>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
