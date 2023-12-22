import AntdButton from "./components/AntdButton/AntdButton";
import {Input} from "antd";
import React from "react";


export const EDIT_PROFILE_INPUTS_CONST = [
  {
    name: "name",
    placeholder: "Edit Your Username",
  },
  {
    name: "email",
    placeholder: "Edit Your Email",
  },
  {
    name: "newPassword",
    placeholder: "Edit Your Password",
  },
];

export const radioButton = ["true", "false", "reset"];

export const generateColumns = (
  deleteTodoFunc,
  doneTodoFunc,
  editTodoFunc,
  value,
  imageTodoFunc
) => {
  const { t } = value;
  let columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Image",
      render: (record) => <img style={{width:"100%"}} src={record.imageUrl} alt="" />,
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (status ? t("true") : t("false")),
    },
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Buttons",
      render: (_id) => (
        <>
          <AntdButton
            func={() => {
              editTodoFunc(_id);
            }}
            htmlType="text"
            text={t("Edit")}
          />
          <AntdButton
            func={() => deleteTodoFunc(_id)}
            htmlType="text"
            text={t("Delete")}
          />
          <AntdButton
            func={() => doneTodoFunc(_id)}
            htmlType="text"
            text={t("Done")}
          />
          <Input type="file" id="fileInput" onChange={imageTodoFunc} />
        </>
      ),
    },
  ];
  columns = columns.map((el) => ({ ...el, title: t(el.title) }));
  return columns;
};

export const todoFormCreate = [
  {
    type: "text",
    name: "title",
    placeholder: "Enter title of crud",
  },
  {
    type: "text",
    name: "descr",
    placeholder: "Enter description of crud",
  },
];

export const languages = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
];
