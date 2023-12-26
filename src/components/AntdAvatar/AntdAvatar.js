import { UserOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import s from "./AntdAvatar.module.css";

const AntdAvatar = ({ showModalSecond, size }) => {
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  return (
    <Avatar
      className={s.ava}
      onClick={showModalSecond}
      shape="circle"
      size={size}
      src={profile.imageUrl ? profile.imageUrl : undefined}
      icon={!profile.imageUrl && <UserOutlined />}
    />
  );
};
export default AntdAvatar;
