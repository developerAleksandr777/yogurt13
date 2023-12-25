import React from "react";
import { Modal } from "antd";
import FormCreateCrud from "../FormCreateCrud/FormCreateCrud";
import { useTranslation } from "react-i18next";

const AntdModalCrud = ({
  modalCrud,
  handleCancel,
  handleOk,
  handleSubmit,
  handleFileChange,
  handleValues,
  values,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Modal
        title={t("Create crud")}
        open={modalCrud}
        onCancel={handleCancel}
        footer={null}
      >
        <FormCreateCrud
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          handleValues={handleValues}
          values={values}
          handleOk={handleOk}
        />
      </Modal>
    </>
  );
};
export default AntdModalCrud;
