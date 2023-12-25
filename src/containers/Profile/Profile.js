import React, { useEffect, useState } from "react";
import s from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  PROFILE_ASYNC,
  PROFILE_DELETE_ASYNC,
} from "../../redux/actions/actions";
import {
  EditOutlined,
  DeleteOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import AntdButton from "../../components/AntdButton/AntdButton";
import AntdModal from "../../components/AntdModal/AntdModal";
import AntdAvatar from "../../components/AntdAvatar/AntdAvatar";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { REMOVE_TOKEN_ACTION } from "../../redux/slicers/authSlice";
import { Flex, Layout } from "antd";
import AntdHeader from "../../components/AntdHeader/AntdHeader";
import AntdSidebar from "../../components/AntdSidebar/AntdSidebar";
import AntdFooter from "../../components/AntdFooter/AntdFooter";

const Profile = () => {
  const { Content } = Layout;
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const { name, email } = profile;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(PROFILE_ASYNC());
  }, [dispatch]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleDeleteProfile = () => {
    dispatch(PROFILE_DELETE_ASYNC()).then(() =>
      dispatch(REMOVE_TOKEN_ACTION()),
    );

    navigate("/login");
  };

  const handleLogout = () => {
    dispatch(REMOVE_TOKEN_ACTION());
    navigate("/login");
  };

  const layoutStyle = {
    height: "100vh",
  };

  return (
    <Flex gap="middle" wrap="wrap">
      <Layout style={layoutStyle}>
        <AntdHeader title="Profile" />
        <Layout>
          <Content className={s.content}>
            <div className={s.insideContent}>
              <AntdAvatar size={360} />
              <div className={s.info}>
                <p>
                  {t("Username")}: <span className={s.spanInfo}>{name}</span>
                </p>
                <p>
                  {t("Email")}: <span className={s.spanInfo}>{email}</span>
                </p>
                <AntdButton
                  func={showModal}
                  htmlType="button"
                  text={t("Edit profile")}
                  icon={<EditOutlined />}
                />
                <AntdButton
                  func={handleDeleteProfile}
                  htmlType="button"
                  text={t("Delete profile")}
                  icon={<DeleteOutlined />}
                />
                <AntdButton
                  func={handleLogout}
                  htmlType="button"
                  text={t("Logout")}
                  icon={<LogoutOutlined />}
                />
                <AntdModal
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
              </div>
            </div>
          </Content>

          <AntdSidebar />
        </Layout>
        <AntdFooter />
      </Layout>
    </Flex>
  );
};

export default Profile;
