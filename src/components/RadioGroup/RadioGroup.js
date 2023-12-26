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
    <div className={s.filter}>
      <p>Filter by completed:</p>
      <Radio.Group onChange={handleChange} value={value} className={s.group}>
        {renderRadioButton}
      </Radio.Group>
    </div>
  );
};

export default RadioGroup;
