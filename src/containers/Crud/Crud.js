import React, { useEffect, useState } from "react";
import { Button, Flex, Input, Layout, Modal, Table } from "antd";
import { usePageState } from "../../custom hook/usePageState";
import { useSelector, useDispatch } from "react-redux";
import {
  CRUD_ASYNC,
  DELETE_CRUD_ASYNC,
  DONE_CRUD_ASYNC,
  EDIT_CRUD_ASYNC,
  CREATE_CRUD_ASYNC,
  IMAGE_CRUD_ASYNC,
} from "../../redux/actions/actions";
import { generateColumns } from "../../constants";
import FormCreateCrud from "../../components/FormCreateCrud/FormCreateCrud";
import RadioGroup from "../../components/RadioGroup/RadioGroup";
import s from "./Crud.module.css";
import { useTranslation } from "react-i18next";
import AntdAlert from "../../components/AntdAlert/AntdAlert";
import CreateCrudHocWrapper from "../../hoc/CreateCrudHocWrapper";
import AntdModalCrud from "../../components/AntdModalCrud/AntdModalCrud";
import AntdModalEditCrud from "../../components/AntdModalEditCrud/AntdModalEditCrud";
import AntdHeader from "../../components/AntdHeader/AntdHeader";
import AntdFooter from "../../components/AntdFooter/AntdFooter";
import AntdSidebar from "../../components/AntdSidebar/AntdSidebar";

const Crud = () => {
  const { Content } = Layout;

  const [product, setProduct] = useState({});
  const { t } = useTranslation();
  const [alertMessage, setAlertMessage] = useState(null);
  const [refresh, setRefresh] = useState({
    createCrud: false,
    doneCrud: false,
    editCrud: false,
    deleteCrud: false,
  });
  const [paginationState, setPaginationState] = usePageState();
  const dispatch = useDispatch();
  const { crud } = useSelector((state) => state.crud);

  const { page, pageSize, search, status } = paginationState;

  useEffect(() => {
    dispatch(
      CRUD_ASYNC({
        search,
        status,
      }),
    );
  }, [dispatch, search, status, refresh]);

  useEffect(() => {
    if (refresh.editCrud) {
      setAlertMessage(t(`Crud was edited successfully!`));
    } else if (refresh.doneCrud) {
      setAlertMessage(t(`Crud was done successfully!`));
    } else if (refresh.deleteCrud) {
      setAlertMessage(t(`Crud was deleted successfully!`));
    } else if (refresh.createCrud) {
      setAlertMessage(t(`Crud was create successfully!`));
    }

    const timer = setTimeout(() => {
      setAlertMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [refresh, t]);

  const handlePaginationChange = (newPage, newPageSize) => {
    setPaginationState({ page: newPage, pageSize: newPageSize });
  };

  const handleChange = (value) => {
    setPaginationState({ status: value });
  };

  const [values, setValues] = useState({
    title: "",
    descr: "",
  });

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleValues = (name) => (e) => {
    setValues((prev) => ({ ...prev, [name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.title === "" || values.descr === "")
      return alert("One of inputs is empty ");
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", values.title);
    formData.append("descr", values.descr);
    dispatch(CREATE_CRUD_ASYNC(formData));

    setRefresh((prev) => ({ ...prev, createCrud: !prev.createCrud }));
    setValues({
      title: "",
      descr: "",
    });
  };

  const editCrudFunc = () => {
    const promptTitle = prompt("Edit title");
    const promptDescr = prompt("Edit description");
    const obj = {
      promptTitle,
      promptDescr,
      product,
    };
    setRefresh((prev) => ({ ...prev, editCrud: !prev.editCrud }));
    dispatch(EDIT_CRUD_ASYNC(obj));
  };

  const deleteCrudFunc = () => {
    setRefresh((prev) => ({ ...prev, deleteCrud: !prev.deleteCrud }));
    dispatch(DELETE_CRUD_ASYNC(product._id));
  };

  const doneCrudFunc = (crud) => {
    setRefresh((prev) => ({ ...prev, doneCrud: !prev.doneCrud }));
    dispatch(DONE_CRUD_ASYNC(product._id));
  };

  const [modalCrud, setModalCrud] = useState(false);
  const [editModalCrud, setEditModalCrud] = useState(false);
  const showModal = () => {
    setModalCrud(true);
  };
  const handleOk = () => {
    setModalCrud(false);
  };
  const handleCancel = () => {
    setModalCrud(false);
  };

  const cancelModalCrud = () => {
    setEditModalCrud(false);
  };

  const handleId = (crud) => {
    console.log(crud.userId);
    setProduct(crud);
    setEditModalCrud(true);
  };

  const layoutStyle = {
    height: "100vh",
  };

  return (
    <Flex gap="middle" wrap="wrap">
      <Layout style={layoutStyle}>
        <AntdHeader title="Abmin" />
        <Layout>
          <Content className={s.content}>
            <div className={s.wrapperInfo}>
              <RadioGroup
                handleChange={(e) => handleChange(e.target.value)}
                value={status}
              />

              <Button type="primary" onClick={showModal}>
                Create crud
              </Button>
            </div>

            <AntdModalCrud
              modalCrud={modalCrud}
              handleOk={handleOk}
              handleCancel={handleCancel}
              handleSubmit={handleSubmit}
              handleFileChange={handleFileChange}
              handleValues={handleValues}
              values={values}
            />

            <AntdModalEditCrud
              openModalCrud={editModalCrud}
              cancelModalCrud={cancelModalCrud}
              editCrudFunc={editCrudFunc}
              deleteCrudFunc={deleteCrudFunc}
              doneCrudFunc={doneCrudFunc}
            />

            <Table
              key={refresh}
              dataSource={crud}
              columns={generateColumns(handleId, { t })}
              rowKey="id"
              pagination={
                crud.length >= pageSize
                  ? {
                      total: crud.length,
                      pageSize,
                      onShowSizeChange: handlePaginationChange,
                      current: page,
                      onChange: handlePaginationChange,
                      pageSizeOptions: ["4", "8", "12", "16"],
                      showSizeChanger: true,
                      showTotal: (total, range) =>
                        `${range[0]}-${range[1]} из ${total} записей`,
                    }
                  : false // Отключение пагинации, если данных недостаточно
              }
              scroll={{ y: 400 }}
            />
            {alertMessage && <AntdAlert message={alertMessage} />}
          </Content>

          <AntdSidebar
            paginationState={paginationState}
            setPaginationState={setPaginationState}
          />
        </Layout>
        <AntdFooter />
      </Layout>
    </Flex>
  );
};

export default Crud;
