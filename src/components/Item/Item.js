import React from "react";
import s from "./Item.module.css";

const Item = ({ item }) => {
  return (
    <div className="col-3">
      <div className={s.box}>
        <img src={item.img} alt="" />
        <p>{item.name}</p>
        <p>{item.description}</p>
        <p>{item.category}</p>
        <p>{item.price}</p>
      </div>
    </div>
  );
};

export default Item;
