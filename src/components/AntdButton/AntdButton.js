import React from "react";
import s from "./AntdButton.module.css";
import { Button } from "antd";

const AntdButton = ({ text, htmlType, func, icon }) => (
  <Button type="primary" htmlType={htmlType} onClick={func} icon={icon}>
    {text}
  </Button>
);

export default AntdButton;
