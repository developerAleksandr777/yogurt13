import React from "react";
import s from "./Login.module.css";
import LoginForm from "../../components/LoginForm/LoginForm.";

const Login = () => {
  return (
    <div id={s.login}>
      <div className={s.loginWrapper}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
