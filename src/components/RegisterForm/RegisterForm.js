import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { REGISTER_ASYNC } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import Translate from "../Translate/Translate";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../custom hook/useTheme";
import { Switch } from "antd";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols are required")
    .max(20, "Maximum 20 symbols are required")
    .matches(/^[a-z]+$/, "Name should contain lowercase letters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 1 symbol, 1 uppercase letter, 1 number",
    )
    .min(7, "Password length must be between 7 and 15 symbols")
    .max(15, "Password length must be between 7 and 15 symbols")
    .required("Password is required"),
});

const RegisterForm = () => {
  const { t } = useTranslation();
  const { errors } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSubmit = (values, { setErrors }) => {
    dispatch(REGISTER_ASYNC(values));
    setErrors(errors);
    notification.success({
      message: errors === {} && t("Registration Successful"),
      description: errors === {} && t("You have successfully registered!"),
      duration: 2,
    });
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
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
          <Form.Item
            name="name"
            validateStatus={touched.name && errors.name ? "error" : ""}
            help={touched.name && errors.name ? errors.name : ""}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder={t("Name")}
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item
            name="email"
            validateStatus={touched.email && errors.email ? "error" : ""}
            help={touched.email && errors.email ? errors.email : ""}
            autoComplete="off"
          >
            <Input
              prefix={<MailOutlined />}
              type="email"
              placeholder={t("Email")}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              autoComplete="off"
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
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t("Register")}
            </Button>
          </Form.Item>
          <Translate />
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
