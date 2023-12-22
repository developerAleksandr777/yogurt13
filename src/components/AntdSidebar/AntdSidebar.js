import React from "react";
import s from "./AntdSidebar.module.css";
import { Menu, Switch } from "antd";
import {
  ProfileOutlined,
  PartitionOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTheme } from "../../custom hook/useTheme";
import Translate from "../Translate/Translate";
import { useTranslation } from "react-i18next";

const AntdSidebar = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (checked) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
  };
  const { t } = useTranslation();
  const menuItems = [
    { key: "1", icon: <ProfileOutlined />, link: "/", label: "Profile" },
    { key: "2", icon: <PartitionOutlined />, link: "/crud", label: "Crud CRM" },
    {
      key: "3",
      icon: <CoffeeOutlined />,
      link: "/cocktail",
      label: "Cocktail",
    },
  ];

  const render = menuItems.map((item) => {
    return (
      <Menu.Item key={item.key} icon={item.icon}>
        <Link to={item.link}>{t(item.label)}</Link>
      </Menu.Item>
    );
  });

  return (
    <div className={s.sidebar}>
      <Translate />
      <Switch checked={theme === "dark"} onChange={handleThemeChange} />
      <Menu defaultSelectedKeys={["1"]}>{render}</Menu>
    </div>
  );
};

export default AntdSidebar;
