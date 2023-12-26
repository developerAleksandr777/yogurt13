import React from "react";
import { Layout } from "antd";
import s from "./AntdHeader.module.css";
import AntdAvatar from "../AntdAvatar/AntdAvatar";
const AntdHeader = ({ title }) => {
  const { Header } = Layout;

  return (
    <>
      <Header className={s.header}>
        <AntdAvatar size={50} />
        {title}
        <img
          src="https://cdn-icons-png.flaticon.com/128/8030/8030198.png"
          alt=""
          className={s.logo}
        />{" "}
      </Header>
    </>
  );
};

export default AntdHeader;
