import React, { useState, useEffect } from "react";
import "./App.css";
import View from "./View";
import { DataContext } from "./Context";
import { useTranslation } from "react-i18next";
import { languages } from "./constants";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const { i18n } = useTranslation();

  useEffect(() => {
    const getLanguage = localStorage.getItem("crm:selectedLanguage");
    if (getLanguage) {
      const initialLanguage = languages.find((el) => el.code === getLanguage);
      setSelectedLanguage(initialLanguage);
      i18n.changeLanguage(initialLanguage.code);
    }
  }, [i18n]);

  return (
    <DataContext.Provider
      value={{
        selectedLanguage,
        languages,
        setSelectedLanguage,
        i18n,
      }}
    >
      <View />
    </DataContext.Provider>
  );
};

export default App;
