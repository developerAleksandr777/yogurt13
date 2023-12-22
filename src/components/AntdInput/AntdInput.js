import React from "react";
import s from "./AntdInput.module.css";
import { Input } from "antd";
const AntdInput = ({ name, func, placeholder, value }) => (
  <div className={s.input}>
    <Input
      value={
        name === "name"
          ? value.name
          : name === "email"
          ? value.email
          : name === "newPassword"
          ? value.newPassword
          : null
      }
      autoComplete="off"
      name={name}
      onChange={func}
      placeholder={placeholder}
    />
  </div>
);
export default AntdInput;
