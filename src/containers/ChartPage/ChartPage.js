import React, { useEffect } from "react";
import Chart from "../../components/Chart/Chart";
import { Layout,Flex } from "antd";
import AntdHeader from "../../components/AntdHeader/AntdHeader";
import AntdSidebar from "../../components/AntdSidebar/AntdSidebar";
import AntdFooter from "../../components/AntdFooter/AntdFooter";
import { useDispatch,useSelector } from "react-redux";
import s from './ChartPage.module.css'
import { CHART_CRUD_ASYNC } from "../../redux/actions/actions";

const ChartPage = () => {

    const dispatch = useDispatch()

    const {chartCrud} = useSelector(state=> state.crud)

    useEffect(() => {
        dispatch(CHART_CRUD_ASYNC())
    },[dispatch])

    const {Content} = Layout

    console.log(chartCrud);

    const layoutStyle = {
        height: "100vh",
      };
    
  return (
    <Flex gap="middle" wrap="wrap">
    <Layout style={layoutStyle}>
      <AntdHeader title="Chart" />
      <Layout>
        <Content className={s.content}>
            <div className={s.content__wrap}>
            <Chart chartCrud={chartCrud}/>
            </div>
        </Content>
        <AntdSidebar />
      </Layout>
      <AntdFooter />
    </Layout>
  </Flex>
  )
};
export default ChartPage;