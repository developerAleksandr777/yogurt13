import React, { useState } from "react";
import s from "./Login.module.css";
import LoginForm from "../../components/LoginForm/LoginForm.";
import AntdTabs from "../../components/Tabs/AntdTabs";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { useSelector } from "react-redux";

const Login = () => {
  const [loginType, setLoginType] = useState("login");
  const { authErr } = useSelector((state) => state.auth);
  console.log(authErr);
  return (
    <div id={s.login} className={s.loginContainer}>
      <div className={s.videoContainer}>
        <video
          autoPlay
          muted
          loop
          id={s.backgroundVideo}
          className={s.backgroundVideo}
        >
          <source
            src="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
            type="video/mp4"
          />
        </video>
      </div>
      <div className={s.loginWrapper}>
        <div className={s.headerWrapper}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/8030/8030198.png"
            alt=""
          />
        </div>
        <div className={s.underHeader}>
          <p>------The best admin platform in the world------</p>
        </div>
        <AntdTabs loginType={loginType} setLoginType={setLoginType} />
        {authErr && <p>{authErr}</p>}
        {loginType === "login" && <LoginForm />}
        {loginType === "register" && <RegisterForm />}
      </div>
    </div>
  );
};

export default Login;
