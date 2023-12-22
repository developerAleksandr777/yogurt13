import { UserOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";

const AntdAvatar = ({ showModalSecond }) => {
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  console.log(profile);

  return (
    <Avatar
      onClick={showModalSecond}
      shape="square"
      size={100}
      src={profile.imageUrl ? profile.imageUrl : undefined}
      icon={!profile.imageUrl && <UserOutlined />}
    />
  );
};
export default AntdAvatar;
