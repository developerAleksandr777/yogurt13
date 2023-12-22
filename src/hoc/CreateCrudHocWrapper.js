import React from "react";
import s from "./hoc.module.css";

const CreateCrudHocWrapper = ({ children }) => {
  return <div className={s.createCrudHocWrapper}>{children}</div>;
};

export default CreateCrudHocWrapper;
