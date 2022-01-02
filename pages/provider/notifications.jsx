import React, { useState, useEffect } from "react";
import { MainLayout } from "extras/Layout/MainLayout";
import { ListTable } from "extras/components/Table/ListTable";
import { Button, Divider } from "antd";
import NotificationController from "extras/controllers/NotificationController";
import StateView from "extras/components/StateView/StateView";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { ResponsiveTableList } from "extras/components/Table/ResponsiveTableLIst";

const notificController = new NotificationController();

const Notifications = observer(() => {
  const { t } = useTranslation();

  useEffect(() => {
    notificController.getNotList();
  }, []);

  const columns = [
    {
      title: t("provider:tableList.title"),
      dataIndex: "title",
      key: "title",
      width: "33.3%",
      align: "center",
    },
    {
      title: t("provider:tableList.description"),
      dataIndex: "description",
      key: "description",
      width: "33.3%",
      align: "center",
    },
    {
      title: t("provider:tableList.created_at"),
      dataIndex: "created_at",
      width: "33.3%",
      align: "center",
      // render: (ch, data) => {
      //   console.log(data)
      //   return (
      //     <>
      //       {data.read_at.length > 0 && (
      //         <div className="read-at">{data.created_at}</div>
      //       )}
      //     </>
      //   )
      // },
    },
  ];

  const mobileColumn = (item) => [
    {
      item1: (
        <>
          <div className="item">
            <span className="_title">{t("provider:tableList.title")}</span>
            <span>{item.title}</span>
          </div>
          <Divider className="divider" />
        </>
      ),
    },
    {
      item2: (
        <>
          <div className="item">
            <span className="_title">
              {t("provider:tableList.description")}
            </span>
            <span>{item.description}</span>
          </div>
          <Divider className="divider" />
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
          <Divider className="divider" />
        </>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="main_sec">
        <div className="title-box">
          <h2>{t("provider:notifications.title")}</h2>
        </div>
        <Divider className="dvider" />

        <StateView state={notificController.stateview}>
          <ListTable
            list={notificController.notList}
            loading={notificController.loading}
            columns={columns}
            rowClassName={(record, index) => {
              return record.read_at == null ? "row_items" : "";
            }}
          />
          <ResponsiveTableList
            list={notificController.notList}
            mobileColumn={mobileColumn}
            title={t("provider:tableList.mobile.forNotification")}
          />
        </StateView>
      </div>
    </MainLayout>
  );
});

export default Notifications;
