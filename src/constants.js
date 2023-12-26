import { Button } from "antd";
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

export const radioButton = ["yes", "no", "reset"];

export const generateColumns = (handleId, value) => {
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
      render: (record) => (
        <img style={{ width: "100%" }} src={record.imageUrl} alt="" />
      ),
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
    },
    {
      title: "Completed",
      dataIndex: "status",
      render: (status) => (status ? t("yes") : t("no")),
    },
    {
      title: "Edit",
      render: (_id) => (
        <>
          <Button type="primary" onClick={() => handleId(_id)}>
            Edit crud
          </Button>
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
