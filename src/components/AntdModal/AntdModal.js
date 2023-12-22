import React, { useState } from "react";
import { Modal, Input } from "antd";
import AntdInput from "../AntdInput/AntdInput";
import { useDispatch, useSelector } from "react-redux";
import { PROFILE_EDIT_ASYNC } from "../../redux/actions/actions";
import { EDIT_PROFILE_INPUTS_CONST } from "../../constants";
import { useTranslation } from "react-i18next";
import s from './AntdModal.module.css'

const AntdModal = ({ isModalOpen, setIsModalOpen }) => {
  const { t } = useTranslation();

  const { errors } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: "",
    email: "",
    newPassword: "",
  });

  const [file, setFile] = useState(null);

  const handleValues = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(values);

  const handleOk = () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("newPassword", values.newPassword);
    dispatch(PROFILE_EDIT_ASYNC(formData));
    setValues({
      name: "",
      email: "",
      newPassword: "",
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setValues({
      name: "",
      email: "",
      newPassword: "",
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const renderInputs = EDIT_PROFILE_INPUTS_CONST.map((el, index) => {
    return (
        <div className={s.input__wrap}>
          <p>{t(`Edit your ${el.name}`)}:</p>
          <AntdInput
              placeholder={t(el.placeholder)}
              name={el.name}
              func={handleValues}
              key={index}
              tooltip={errors}
              value={values}
          />
        </div>

    );
  });

  return (
    <>
      <Modal
        title={t("Edit profile")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
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
