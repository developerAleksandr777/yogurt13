import React from "react";
import { Button, Modal } from "antd";
import { useTranslation } from "react-i18next";

const AntdModalEditCrud = ({
  openModalCrud,
  cancelModalCrud,
  editCrudFunc,
  deleteCrudFunc,
  doneCrudFunc,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Modal
        title={t("Edit crud")}
        open={openModalCrud}
        onCancel={cancelModalCrud}
      >
        <Button onClick={doneCrudFunc}>Done crud</Button>
        <Button onClick={editCrudFunc}>Edit crud</Button>
        <Button onClick={deleteCrudFunc}>Delete crud</Button>
      </Modal>
    </>
  );
};
export default AntdModalEditCrud;
