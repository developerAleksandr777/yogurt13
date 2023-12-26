import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { IMAGE_CRUD_ASYNC } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import s from "./AntdModalEditCrud.module.css";

const AntdModalEditCrud = ({
  openModalCrud,
  cancelModalCrud,
  editCrudFunc,
  deleteCrudFunc,
  doneCrudFunc,
  product,
  setEditModalCrud,
}) => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOk = () => {
    const formData = new FormData();
    formData.append("image", file);
    const obj = {
      formData,
      product,
    };
    dispatch(IMAGE_CRUD_ASYNC(obj));
    setEditModalCrud(false);
  };

  const renderButtons = [
    {
      func: doneCrudFunc,
      title: "Done crud",
      key: 1,
    },
    {
      func: editCrudFunc,
      title: "Edit crud",
      key: 2,
    },
    {
      func: deleteCrudFunc,
      title: "Delete crud",
      key: 3,
    },
  ];

  const render = renderButtons.map((el) => {
    return (
      <Button key={el.key} type="primary" onClick={el.func}>
        {el.title}
      </Button>
    );
  });

  return (
    <>
      <Modal
        title={t("Edit crud")}
        open={openModalCrud}
        onCancel={cancelModalCrud}
        onOk={handleOk}
      >
        <div className={s.editWrapper}>
          <div className={s.buttonWrapper}>{render}</div>
          <Input type="file" id="fileInput" onChange={handleFileChange} />
        </div>
      </Modal>
    </>
  );
};
export default AntdModalEditCrud;
