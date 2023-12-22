import React from "react";
import s from "./FormCreateCrud.module.css";
import { Input } from "antd";
import AntdButton from "../AntdButton/AntdButton";
import { todoFormCreate } from "../../constants";
import { useTranslation } from "react-i18next";

const FormCreateCrud = ({ handleSubmit, handleValues, values,handleFileChange }) => {
  const { t } = useTranslation();
  const render = todoFormCreate.map((el, index) => {
    return (
      <Input
        key={index + 1}
        type={el.type}
        onChange={handleValues(el.name)}
        value={el.name === "title" ? values.title : values.descr}
        name={el.name}
        placeholder={t(el.placeholder)}
      />
    );
  });

  return (
    <div className={s.formDiv}>
      <p>{t("Create CRUD")}</p>
      <form onSubmit={handleSubmit}>
        {render}
          <Input type="file" id="fileInput" onChange={handleFileChange} />

          <AntdButton text={t("Send")} htmlType="submit" />
      </form>
    </div>
  );
};

export default FormCreateCrud;
