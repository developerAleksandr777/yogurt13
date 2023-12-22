import React from "react";
import s from "./AntdAlert.module.css";
import { Alert } from "antd";
const AntdAlert = ({ message }) => (
  <Alert className={s.alert} message={message} type="success" />
);
export default AntdAlert;
