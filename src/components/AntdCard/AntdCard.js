import React from "react";
import s from "./AntdCard.module.css";

import { Avatar, Card } from "antd";
const { Meta } = Card;
const AntdCard = ({ item }) => (
  <div className="col-4">
    <Card cover={<img alt="example" src={item.img} />} className={s.card}>
      <Meta
        avatar={<Avatar src={item.img} />}
        title={item.name}
        description={item.description}
      />
    </Card>
  </div>
);
export default AntdCard;
