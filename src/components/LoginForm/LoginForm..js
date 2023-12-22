import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input, Button, notification, Switch } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { LOGIN_ASYNC } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import Translate from "../Translate/Translate";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../custom hook/useTheme";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 1 symbol, 1 uppercase letter, 1 number"
    )
    .min(7, "Password length must be between 7 and 15 symbols")
    .max(15, "Password length must be between 7 and 15 symbols")
    .required("Password is required"),
});

const LoginForm = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (checked) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
  };
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(LOGIN_ASYNC(values));
    notification.success({
      message: t("Login Successful"),
      description: t("You have successfully logined!"),
      duration: 2,
    });
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form name="registration" onFinish={handleSubmit}>
          <h2>{t("Login")}</h2>

          <Form.Item
            name="email"
            validateStatus={touched.email && errors.email ? "error" : ""}
            help={touched.email && errors.email ? errors.email : ""}
          >
            <Input
              prefix={<MailOutlined />}
              type="email"
              placeholder={t("Email")}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
          </Form.Item>

          <Form.Item
            name="password"
            validateStatus={touched.password && errors.password ? "error" : ""}
            help={touched.password && errors.password ? errors.password : ""}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t("Password")}
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t("Login")}
            </Button>
          </Form.Item>
          <Translate />
          <Switch checked={theme === "dark"} onChange={handleThemeChange} />

          <Link to="/register">{t("No an account yet")}?</Link>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
