import React, { useState } from "react";
import s from "./AntdSidebar.module.css";
import { Input, Menu } from "antd";
import { ProfileOutlined, PartitionOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layout } from "antd";

const AntdSidebar = ({ setPaginationState, paginationState }) => {
  const { Sider } = Layout;
  const [name, setName] = useState("");
  const [number, setNumber] = useState("1");

  const { t } = useTranslation();
  const menuItems = [
    { key: "1", icon: <ProfileOutlined />, link: "/", label: "Profile" },
    { key: "2", icon: <PartitionOutlined />, link: "/crud", label: "Admin" },
  ];

  const handleMenuClick = (item) => {
    setNumber((prevNumber) => item.key);
    setName((prevName) => item.label);
  };
  const render = menuItems.map((item) => (
    <Menu.Item
      key={item.key}
      icon={item.icon}
      onDoubleClick={() => handleMenuClick(item)}
    >
      <Link to={item.link}>{t(item.label)}</Link>
    </Menu.Item>
  ));

  console.log(name, number);

  const sidebarStyle = {
    paddingTop: "20px",
    paddingBottom: "20px",
    position: "fixed",
    height: `calc(100vh - (var(--headerHeight) + var(--footerHeight)))`,
    width: "var(--sidebar-width)",
    right: "0",
    marginTop: "var(--headerHeight)",
    backgroundColor: "var(--sidebar-color)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    rowGap: "20px",
  };

  return (
    <>
      <Sider className={s.sidebar} style={sidebarStyle}>
        <Menu defaultSelectedKeys={[number]}>{render}</Menu>
        {name === "Crud CRM" && (
          <Input
            onChange={(e) => {
              setPaginationState({ search: e.target.value, page: 1 });
            }}
            value={paginationState.search}
            placeholder={t("Search by title")}
            className={s.search}
          />
        )}
      </Sider>
    </>
  );
};

export default AntdSidebar;
