import React, { useState, useEffect } from "react";
import { MainLayout } from "extras/Layout/MainLayout";
import { observer } from "mobx-react";
import { Divider, Button, Tag } from "antd";
import Router from "next/router";
import StateView from "extras/components/StateView/StateView";
import { PlusOutlined } from "@ant-design/icons";

import TicketController from "extras/controllers/TicketController";
import { ListTable } from "extras/components/Table/ListTable";
import { useTranslation } from "react-i18next";
import { ResponsiveTableList } from "extras/components/Table/ResponsiveTableLIst";

const ticketController = new TicketController();

const Tickets = observer(() => {
  const { t } = useTranslation();

  useEffect(() => {
    ticketController.getAllTickets();
  }, []);

  const showHandler = (id) => {
    Router.push(`/provider/ticket_details/${id}`);
  };

  const RouteHandler = () => {
    Router.push("/provider/add_ticket");
  };

  const colorHanler = (e) => {
    if (e === "responsed") {
      return "green";
    }
    if (e === "closed") {
      return "red";
    }
    if (e === "pending") {
      return "orange";
    }
    if (e === "answered") {
      return "green";
    }
    if (e === "user_response") {
      return "blue";
    } else {
      return "blue";
    }
  };

  const columns = [
    {
      title: t("provider:tableList.id"),
      dataIndex: "id",
      key: "id",
      width: "10%",
      align: "center",
    },
    {
      title: t("provider:tableList.title"),
      dataIndex: "subject",
      key: "subject",
      width: "30%",
      align: "center",
    },
    {
      title: t("provider:tableList.department"),
      dataIndex: "department",
      key: "department",
      width: "10%",
      align: "center",
    },
    {
      title: t("provider:tableList.status"),
      dataIndex: "status",
      width: "20%",
      align: "center",
      render: (ch, data) => {
        return (
          <>
            {data.status === "closed" ? (
              <Tag color={colorHanler(data.status)}>
                {t("provider:tableList.ticket-tags.closed")}
              </Tag>
            ) : data.status === "pending" ? (
              <Tag color={colorHanler(data.status)}>
                {t("provider:tableList.ticket-tags.pending")}
              </Tag>
            ) : data.status === "responsed" ? (
              <Tag color={colorHanler(data.status)}>
                {t("provider:tableList.ticket-tags.responsed")}
              </Tag>
            ) : data.status === "answered" ? (
              <Tag color={colorHanler(data.status)}>
                {t("provider:tableList.ticket-tags.answered")}
              </Tag>
            ) : data.status === "user_response" ? (
              <Tag color={colorHanler(data.status)}>
                {t("provider:tableList.ticket-tags.user_response")}
              </Tag>
            ) : (
              ""
            )}
          </>
        );
      },
    },
    {
      title: t("provider:tableList.actions"),
      dataIndex: "row",
      key: "actions",
      width: "20%",
      align: "center",

      render: (ch, data, i) => (
        <>
          <div className="text-center ">
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
            <span className="_title">{t("provider:tableList.id")}</span>
            <span>{item.id}</span>
          </div>
          <Divider className="divider" />
        </>
      ),
    },
    {
      item2: (
        <>
          <div className="item">
            <span className="_title">{t("provider:tableList.title")}</span>
            <span>{item.subject}</span>
          </div>
          <Divider className="divider" />
        </>
      ),
    },
    {
      item3: (
        <>
          <div className="item">
            <span className="_title">{t("provider:tableList.department")}</span>
            <span>{item.department}</span>
          </div>
          <Divider className="divider" />
        </>
      ),
    },
    {
      item4: (
        <>
          {/* {colorHanler(item.status)} */}
          <div className="item">
            <span className="_title">وضعیت</span>
            <span>
              {item.status === "closed" ? (
                <Tag color={colorHanler(item.status)}>
                  {t("provider:tableList.ticket-tags.closed")}
                </Tag>
              ) : item.status === "pending" ? (
                <Tag color={colorHanler(item.status)}>
                  {t("provider:tableList.ticket-tags.pending")}
                </Tag>
              ) : item.status === "responsed" ? (
                <Tag color={colorHanler(item.status)}>
                  {t("provider:tableList.ticket-tags.responsed")}
                </Tag>
              ) : item.status === "answered" ? (
                <Tag color={colorHanler(item.status)}>
                  {t("provider:tableList.ticke-tags.answered")}
                </Tag>
              ) : item.status === "user_response" ? (
                <Tag color={colorHanler(item.status)}>
                  {t("provider:tableList.ticket-tags.user_response")}
                </Tag>
              ) : (
                ""
              )}
            </span>
          </div>
          <Divider className="divider" />
        </>
      ),
    },
    {
      item5: (
        <>
          <div className="item">
            <span className="_title">جزییات سفارش</span>
            <div className="text-center ">
              <Button
                className="details-btn"
                onClick={() => showHandler(item.id)}
              >
                {t("provider:tableList.see_more")}
              </Button>
            </div>
          </div>
          <Divider className="divider" />
        </>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="main_sec">
        <div className="title-box">
          <h2>تیکت ها</h2>
          <Button className="typic_btn" onClick={RouteHandler}>
            اضافه کردن تیکت جدید <PlusOutlined />
          </Button>
        </div>
        <Divider className="dvider" />
        <StateView state={ticketController.stateview}>
          <ListTable
            list={ticketController.ticketList}
            loading={ticketController.loading}
            columns={columns}
          />
          <ResponsiveTableList
            list={ticketController.ticketList}
            title={t("provider:tableList.mobile.forTickets")}
            mobileColumn={mobileColumn}
          />
        </StateView>
      </div>
    </MainLayout>
  );
});

export default Tickets;
