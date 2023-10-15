import React, { useState, useEffect } from "react";
import "./assets/css/app/index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { AuthContext } from "./context/AuthContext";
import List from "./pages/List";
import AuthWrapper from "./auth/AuthWrapper";
import ROLE from "./auth/Role";
import PropertyDetail from "./pages/PropertyDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/404";
import Payment from "pages/Payment";
import CreateNewPassword from "pages/CreateNewPassword";
import { ToastContainer, toast } from "react-toastify";
import Profile from "pages/Profile";
import Footer from "./components/Footer";
import { StompSessionProvider, useSubscription } from "react-stomp-hooks";

function App() {
  const [isSignedIn, setSignedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("User");

  const authContext = { isSignedIn, setSignedIn, user, setUser, role, setRole };

  useSubscription("/topic/tenants", (msg) => {
    toast.success(JSON.parse(msg.body).message);
  });
  return (
    <AuthContext.Provider value={authContext}>
      <ToastContainer />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="/create-new-password/:token"
          element={<CreateNewPassword />}
        />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route
          path="/list"
          element={
            <AuthWrapper role={[ROLE.Tenant]}>
              <List />
            </AuthWrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthWrapper role={[ROLE.Tenant]}>
              <Profile />
            </AuthWrapper>
          }
        />
        <Route path="/payment/:id" element={<Payment />} />
      </Routes>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
