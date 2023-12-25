import React from "react";
import { Tabs } from "antd";
const AntdTabs = ({ loginType, setLoginType }) => {
  const { TabPane } = Tabs;

  return (
    <Tabs
      centered
      activeKey={loginType}
      onChange={(activeKey) => setLoginType(activeKey)}
    >
      <TabPane key={"register"} tab={"Register"} />
      <TabPane key={"login"} tab={"Login"} />
    </Tabs>
  );
};

export default AntdTabs;
