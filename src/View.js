import React from "react";
import Login from "./containers/Login/Login";
import Profile from "./containers/Profile/Profile";
import Crud from "./containers/Crud/Crud";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./Layout/Layout";
import AntdLayout from "./containers/AntdLayout/AntdLayout";

const View = () => {
  const { auth } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={auth ? <Layout /> : <Navigate to="/login" />}>
        <Route index element={<Profile />} />
        <Route path="/crud" element={<Crud />} />
        <Route path="/layout" element={<AntdLayout />} />
      </Route>
      <Route path="/login" element={auth ? <Navigate to="/" /> : <Login />} />
    </Routes>
  );
};

export default View;
