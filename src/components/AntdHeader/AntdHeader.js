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
        <AntdAvatar size={50} />
      </Header>
    </>
  );
};

export default AntdHeader;
