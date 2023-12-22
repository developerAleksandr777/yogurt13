import React from "react";
import s from "./Register.module.css";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const Register = () => {
  return (
    <div id={s.register}>
      <div className={s.registerWrapper}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
