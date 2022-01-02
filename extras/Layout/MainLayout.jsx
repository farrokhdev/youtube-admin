import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { ContentL } from "./Content/ContentL";
import { observer, inject } from "mobx-react";
import { Navbar } from "extras/components/Navbar/Navbar";
import { useTranslation } from "react-i18next";
import { Sidebar } from "./Sidebar/Sidebar";
import RegisterController from "extras/controllers/RegisterController";
import NotificationController from "extras/controllers/NotificationController";
import Router from "next/router";

const { Footer } = Layout;

const controller = new RegisterController();
const notController = new NotificationController();

export const MainLayout = inject("coreProviderStore")(
  observer(({ coreProviderStore, children }) => {
    const { t } = useTranslation();
    const [collapsed, setCollapsed] = useState(false);

    // useEffect(() => {
    //   controller.redirectToReg()
    // }, [])

    useEffect(() => {
      notController.getNotCount((data) => {
        coreProviderStore.setNotification(data);
      });
    }, []);

    return (
      <Layout dir="rtl" className="layout">
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout className="main_contents">
          <Sidebar collapsed={collapsed} />
          <Layout className="content_layout">
            <ContentL child={children} />
          </Layout>
        </Layout>
        <Footer>
          <div className="f">{t("provider:footer.first")}</div>
          <div className="s">{t("provider:footer.second")}</div>
        </Footer>
      </Layout>
    );
  })
);
