import React from "react";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import Profile from "./containers/Profile/Profile";
import Crud from "./containers/Crud/Crud";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./Layout/Layout";

const View = () => {
  const { auth } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={auth ? <Layout /> : <Navigate to="/login" />}>
        <Route index element={<Profile />} />
        <Route path="/crud" element={<Crud />} />
      </Route>
      <Route path="/login" element={auth ? <Navigate to="/" /> : <Login />} />
      <Route
        path="/register"
        element={auth ? <Navigate to="/" /> : <Register />}
      />
    </Routes>
  );
};

export default View;
