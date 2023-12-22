import React from "react";
import { Radio } from "antd";
import { useTranslation } from "react-i18next";

const RadioButton = ({ value }) => {
  const { t } = useTranslation();
  return <Radio value={value}>{t(value)}</Radio>;
};

export default RadioButton;
