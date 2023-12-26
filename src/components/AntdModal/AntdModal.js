import React from "react";
import { Modal, Input, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import AntdInput from "../AntdInput/AntdInput";
import { useDispatch, useSelector } from "react-redux";
import { PROFILE_EDIT_ASYNC } from "../../redux/actions/actions";
import { EDIT_PROFILE_INPUTS_CONST } from "../../constants";
import { useTranslation } from "react-i18next";
import s from "./AntdModal.module.css";

const AntdModal = ({ isModalOpen, setIsModalOpen }) => {
  const { t } = useTranslation();
  const { errors } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      newPassword: "",
      file: null,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Minimum 3 symbols are required")
        .max(20, "Maximum 20 symbols are required")
        .matches(/^[a-z]+$/, "Name should contain lowercase letters"),
      email: Yup.string().email("Invalid email"),
      newPassword: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must contain at least 1 symbol, 1 uppercase letter, 1 number",
        )
        .min(7, "Password length must be between 7 and 15 symbols")
        .max(15, "Password length must be between 7 and 15 symbols"),
      file: Yup.mixed().test("fileSize", "Image too large", (value) =>
        value ? value.size <= 1048576 : true,
      ),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("image", values.file);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("newPassword", values.newPassword);

      dispatch(PROFILE_EDIT_ASYNC(formData));
      formik.resetForm();
      setIsModalOpen(false);
    },
  });

  const handleFileChange = (e) => {
    formik.setFieldValue("file", e.target.files[0]);
  };

  const renderInputs = EDIT_PROFILE_INPUTS_CONST.map((el, index) => (
    <div className={s.input__wrap} key={index}>
      <p>{t(`Edit your ${el.name}`)}:</p>
      <AntdInput
        placeholder={t(el.placeholder)}
        name={el.name}
        func={formik.handleChange}
        tooltip={errors}
        value={formik.values[el.name]}
      />
      {formik.touched[el.name] && formik.errors[el.name] && (
        <div className={s.error}>{formik.errors[el.name]}</div>
      )}
    </div>
  ));

  return (
    <>
      <Modal
        title={t("Edit profile")}
        open={isModalOpen}
        onOk={formik.handleSubmit}
        onCancel={() => {
          formik.resetForm();
          setIsModalOpen(false);
        }}
      >
        <div className={s.modal__wrapper}>
          <div className={s.input__wrap}>
            <p>{t("Edit your avatar")}:</p>
            <Input type="file" id="fileInput" onChange={handleFileChange} />
          </div>
          {renderInputs}
        </div>
      </Modal>
    </>
  );
};
export default AntdModal;
