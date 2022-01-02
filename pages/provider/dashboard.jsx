import React, { useState, useEffect } from "react";
import { MainLayout } from "extras/Layout/MainLayout";
import { DashboardItems } from "extras/components/DashboardItems/DashboardItems";
import { Row, Col, Divider, Button, Card, Tag } from "antd";
import { ListTable } from "extras/components/Table/ListTable";
import StateView from "extras/components/StateView/StateView";
import { observer } from "mobx-react";
import dynamic from "next/dynamic";
import {
  BsFillBarChartFill,
  BsFillPieChartFill,
  BsBorderStyle,
} from "react-icons/bs";
import Router from "next/router";

import { useTranslation } from "react-i18next";
import { GiProgression } from "react-icons/gi";
import { FaVideo } from "react-icons/fa";
import { GrChannel, GrInProgress } from "react-icons/gr";
// import { BiTime, BiVideoPlus } from 'react-icons/bi'
import DashboardController from "extras/controllers/DashboardController";
import CurrencyFormat from "react-currency-format";
import { ResponsiveTableList } from "extras/components/Table/ResponsiveTableLIst";

// const ChartDynamic = dynamic(() => import('extras/components/Chart/Chart'), {
//   ssr: false,
//   loading: () => <p>...</p>,
// })

// const ChartCyrcleDynamic = dynamic(
//   () => import('extras/components/Chart/ChartCyrcle'),
//   {
//     ssr: false,
//     loading: () => <p>...</p>,
//   },
// )

const controller = new DashboardController();

const Dashboard = observer(() => {
  const { t } = useTranslation();
  const [color, setColor] = useState();

  useEffect(() => {
    controller.getDashboardList();
  }, []);

  const colorHandler = (e) => {
    if (e === "paymented") {
      return "green";
    }
    if (e === "problem") {
      return "red";
    }
    if (e === "pending") {
      return "orange";
    }
    if (e === "in_queue") {
      return "gold";
    }
    if (e === "in_progress") {
      return "lime";
    }
    if (e === "ended") {
      return "blue";
    }
    if (e === "completed") {
      return "green";
    } else {
      return "blue";
    }
  };

  const { dashboardList, dashboardOrders } = controller;

  console.log(dashboardList);

  const showHandler = (id) => {
    Router.push(`/provider/order_single/${id}`);
  };

  const columns = [
    {
      title: t("provider:tableList.orders.order_number"),
      dataIndex: "order_number",
      key: "order_number",
      width: "20%",
      align: "right",
    },

    {
      title: t("provider:tableList.orders.amount"),
      dataIndex: "amount",
      width: "20%",
      align: "center",
      render: (ch, data) => (
        <CurrencyFormat
          value={data.amount}
          displayType={"text"}
          thousandSeparator={true}
          suffix={" " + "تومان"}
          renderText={(value) => <div>{value}</div>}
        />
      ),
    },
    {
      title: t("provider:tableList.created_at"),
      dataIndex: "created_at",
      width: "20%",
      align: "center",
      responsive: ["md"],
    },
    {
      title: t("provider:tableList.status"),
      dataIndex: "status",
      width: "20%",
      align: "center",
      responsive: ["md"],

      render: (ch, data) => {
        return (
          <>
            {data.status === "paymented" ? (
              <Tag color={colorHandler(data.status)}>
                {t("provider:tableList.tags.peymented")}
              </Tag>
            ) : data.status === "awaiting_payment" ? (
              <Tag color={colorHandler(data.status)}>
                {t("provider:tableList.tags.awaiting_payment")}
              </Tag>
            ) : data.status === "problem" ? (
              <Tag color={colorHandler(data.status)}>
                {t("provider:tableList.tags.problem")}
              </Tag>
            ) : data.status === "pending" ? (
              <Tag color={colorHandler(data.status)}>
                {t("provider:tableList.tags.pending")}
              </Tag>
            ) : data.status === "in_queue" ? (
              <Tag color={colorHandler(data.status)}>
                {t("provider:tableList.tags.in_queue")}
              </Tag>
            ) : data.status === "in_progress" ? (
              <Tag color={colorHandler(data.status)}>
                {t("provider:tableList.tags.in_progress")}
              </Tag>
            ) : data.status === "ended" ? (
              <Tag color={colorHandler(data.status)}>
                {t("provider:tableList.tags.ended")}
              </Tag>
            ) : data.status === "completed" ? (
              <Tag color={colorHandler(data.status)}>
                {t("provider:tableList.tags.completed")}
              </Tag>
            ) : (
              <Tag color={colorHandler(data.status)}>{data.status}</Tag>
            )}
          </>
        );
      },
    },
    {
      title: t("provider:tableList.details"),
      dataIndex: "row",
      key: "actions",
      width: "20%",
      align: "center",

      render: (ch, data, i) => (
        <>
          <div>
            <Button
              className="details-btn"
              onClick={() => showHandler(data.id)}
            >
              {t("provider:tableList.see_more")}
            </Button>
          </div>
        </>
      ),
    },
  ];

  const mobileColumn = (item) => [
    {
      item1: (
        <>
          <div className="item">
            <span className="_title">
              {t("provider:tableList.orders.order_number")}
            </span>
            <span>{item.order_number}</span>
          </div>
          <Divider />
        </>
      ),
    },
    {
      item2: (
        <>
          <div className="item">
            <span className="_title">
              {t("provider:tableList.orders.amount")}
            </span>
            <span>
              <CurrencyFormat
                value={item.amount}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" " + "تومان"}
                renderText={(value) => <div>{value}</div>}
              />
            </span>
          </div>
          <Divider />
        </>
      ),
    },
    {
      item3: (
        <>
          <div className="item">
            <span className="_title">{t("provider:tableList.created_at")}</span>
            <span>{item.created_at}</span>
          </div>
          <Divider />
        </>
      ),
    },
    {
      item4: (
        <>
          {/* {colorHanler(item.status)} */}
          <div className="item">
            <span className="_title">{t("provider:tableList.status")}</span>
            <span>
              {item.status === "paymented" ? (
                <Tag color={colorHandler(item.status)}>
                  {t("provider:tableList.tags.peymented")}
                </Tag>
              ) : item.status === "awaiting_payment" ? (
                <Tag color={colorHandler(item.status)}>
                  {t("provider:tableList.tags.awaiting_payment")}
                </Tag>
              ) : item.status === "problem" ? (
                <Tag color={colorHandler(item.status)}>
                  {t("provider:tableList.tags.problem")}
                </Tag>
              ) : item.status === "pending" ? (
                <Tag color={colorHandler(item.status)}>
                  {t("provider:tableList.tags.pending")}
                </Tag>
              ) : item.status === "in_queue" ? (
                <Tag color={colorHandler(item.status)}>
                  {t("provider:tableList.tags.in_queue")}
                </Tag>
              ) : item.status === "in_progress" ? (
                <Tag color={colorHandler(item.status)}>
                  {t("provider:tableList.tags.in_progress")}
                </Tag>
              ) : item.status === "ended" ? (
                <Tag color={colorHandler(item.status)}>
                  {t("provider:tableList.tags.ended")}
                </Tag>
              ) : item.status === "completed" ? (
                <Tag color={colorHandler(item.status)}>
                  {t("provider:tableList.tags.completed")}
                </Tag>
              ) : (
                <Tag color={colorHandler(item.status)}>{item.status}</Tag>
              )}
            </span>
          </div>
          <Divider />
        </>
      ),
    },
    {
      item5: (
        <>
          <div className="item">
            <span className="_title">{t("provider:tableList.details")}</span>
            <div className="text-center ">
              <Button
                className="details-btn"
                onClick={() => showHandler(item.id)}
              >
                {t("provider:tableList.see_more")}
              </Button>
            </div>
          </div>
          <Divider />
        </>
      ),
    },
  ];

  return (
    <StateView state={controller.stateview}>
      <MainLayout>
        <div className="main_sec">
          <div className="title-box">
            <h2>{t("provider:dashboard.title")}</h2>
          </div>
          <Divider className="dvider" />

          <div className="dash_items">
            <div className="dashboard_box">
              {/* <StateView state={controller.stateview}> */}
              <p>{t("provider:dashboard.total_orders")}</p>
              <div className="count">
                <span className="txt">{dashboardList.total_orders}</span>
                <BsBorderStyle className="chart_icon" />
              </div>
              {/* </StateView> */}
            </div>
            <div className="dashboard_box">
              {/* <StateView state={controller.stateview}> */}
              <p>{t("provider:dashboard.total_order_in_queue")}</p>
              <div className="count">
                <span className="txt">
                  {dashboardList.total_order_in_queue}
                </span>
                {/* <BiTime className="chart_icon" /> */}
              </div>
              {/* </StateView> */}
            </div>
            <div className=" dashboard_box">
              <p>{t("provider:dashboard.total_order_in_progress")}</p>
              <div className="count">
                <span className="txt">
                  {dashboardList.total_order_in_progress}
                </span>
                {/* <BiTime className="chart_icon" /> */}
              </div>
            </div>
            <div className=" dashboard_box">
              <p>{t("provider:dashboard.total_contents")}</p>

              <div className="count">
                <span className="txt">{dashboardList.total_contents}</span>
                <FaVideo className="chart_icon" />
              </div>
            </div>
            <div className=" dashboard_box">
              <p>{t("provider:dashboard.total_channels")}</p>
              <div className="count">
                <span className="txt">{dashboardList.total_channels}</span>
                {/* <BiVideoPlus className="chart_icon" /> */}
              </div>
            </div>
            {/* <Card className=" dash_item">
            <ChartDynamic />
          </Card> */}
            {/* <Card className=" dash_item">
            <ChartCyrcleDynamic />
          </Card> */}
          </div>
          <div className="order_list">
            <ListTable
              list={dashboardOrders}
              loading={controller.loading}
              columns={columns}
            />
            <ResponsiveTableList
              list={controller.dashboardOrders}
              title={t("provider:tableList.mobile.forDashboard")}
              mobileColumn={mobileColumn}
            />
          </div>
        </div>
      </MainLayout>
    </StateView>
  );
});

export default Dashboard;
