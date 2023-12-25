import React from "react";
import { Layout } from "antd";
import s from "./AntdFooter.module.css";
const AntdFooter = () => {
  const { Footer } = Layout;
  return (
    <>
      <Footer className={s.footer}>Footer</Footer>
    </>
  );
};

export default AntdFooter;
