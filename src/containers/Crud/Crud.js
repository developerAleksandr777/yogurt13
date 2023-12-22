import React, { useEffect, useState } from "react";
import { Input, Table } from "antd";
import { usePageState } from "../../custom hook/usePageState";
import { useSelector, useDispatch } from "react-redux";
import AntdInput from "../../components/AntdInput/AntdInput";
import {
  CRUD_ASYNC,
  DELETE_CRUD_ASYNC,
  DONE_CRUD_ASYNC,
  EDIT_CRUD_ASYNC,
  CREATE_CRUD_ASYNC, PROFILE_EDIT_ASYNC, IMAGE_CRUD_ASYNC,
} from "../../redux/actions/actions";
import { generateColumns } from "../../constants";
import FormCreateCrud from "../../components/FormCreateCrud/FormCreateCrud";
import RadioGroup from "../../components/RadioGroup/RadioGroup";
import s from "./Crud.module.css";
import { useTranslation } from "react-i18next";
import AntdAlert from "../../components/AntdAlert/AntdAlert";
import CreateCrudHocWrapper from "../../hoc/CreateCrudHocWrapper";

const Crud = () => {
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
      })
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

  const editCrudFunc = (crud) => {
    const promptTitle = prompt("Edit title");
    const promptDescr = prompt("Edit description");
    const obj = {
      promptTitle,
      promptDescr,
      crud,
    };
    setRefresh((prev) => ({ ...prev, editCrud: !prev.editCrud }));
    dispatch(EDIT_CRUD_ASYNC(obj));
  };

  const deleteTodoFunc = (crud) => {
    setRefresh((prev) => ({ ...prev, deleteCrud: !prev.deleteCrud }));
    dispatch(DELETE_CRUD_ASYNC(crud._id));
  };

  const doneTodoFunc = (crud) => {
    setRefresh((prev) => ({ ...prev, doneCrud: !prev.doneCrud }));
    dispatch(DONE_CRUD_ASYNC(crud._id));
  };


  const imageTodoFunc = (crud, e) => {
    console.log(crud)
    setFile(e?.target.files[0]);
    const formData = new FormData();
    formData.append("image", file);
    dispatch(IMAGE_CRUD_ASYNC(crud._id, formData));
  };
  console.log(file);

  return (
    <div>
      <div className={s.crud}>
        <h1>Crud</h1>
        <CreateCrudHocWrapper>
          <RadioGroup
            handleChange={(e) => handleChange(e.target.value)}
            value={status}
          />
          <Input
            onChange={(e) => {
              setPaginationState({ search: e.target.value, page: 1 });
            }}
            value={paginationState.search}
            placeholder={t("Search by title")}
          />

          <FormCreateCrud
              handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
            handleValues={handleValues}
            values={values}
          />
        </CreateCrudHocWrapper>

        <Table
          key={refresh}
          dataSource={crud}
          columns={generateColumns(deleteTodoFunc, doneTodoFunc, editCrudFunc, {
            t,
          },imageTodoFunc)}
          rowKey="id"
          pagination={{
            pageSize,
            onShowSizeChange: handlePaginationChange,
            current: page,
            onChange: handlePaginationChange,
            pageSizeOptions: ["4", "8", "12", "16"],
            showSizeChanger: true,
          }}
          scroll={{ y: 400 }}
        />
      </div>
      {alertMessage && <AntdAlert message={alertMessage} />}
    </div>
  );
};

export default Crud;
