import React from "react";
import { Radio } from "antd";
import RadioButton from "./RadioButton/RadioButton";
import { radioButton } from "../../constants";
import s from "./RadioGroup.module.css";

const RadioGroup = ({ handleChange, value }) => {
  const renderRadioButton = radioButton.map((el, index) => (
    <RadioButton value={el} key={index} />
  ));
  return (
    <Radio.Group onChange={handleChange} value={value} className={s.group}>
      {renderRadioButton}
    </Radio.Group>
  );
};

export default RadioGroup;
