import React, { useContext } from "react";
import { Menu, Dropdown } from "antd";
import { DataContext } from "../../Context";

const Translate = () => {
  const { selectedLanguage, setSelectedLanguage, i18n, languages } =
    useContext(DataContext);

  const handleLanguageChange = (value) => {
    if (!value || !value.key) {
      console.error("Invalid value or key");
      return;
    }

    const { key } = value;
    const newSelectedLanguage = languages.find((el) => el.code === key);

    if (!newSelectedLanguage) {
      console.error("Selected language not found");
      return;
    }

    setSelectedLanguage(newSelectedLanguage);
    console.log(newSelectedLanguage.code);

    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(newSelectedLanguage.code);
    } else {
      console.error("Invalid 'i18n' object or missing 'changeLanguage' method");
    }

    localStorage.setItem("crm:selectedLanguage", newSelectedLanguage.code);
  };

  if (!selectedLanguage || !setSelectedLanguage || !i18n || !languages) {
    console.error("Invalid DataContext");
    return null;
  }

  const menu = (
    <Menu onClick={handleLanguageChange}>
      {languages.map((el) => (
        <Menu.Item key={el.code}>{el.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <p>{selectedLanguage.label}</p>
    </Dropdown>
  );
};

export default Translate;
