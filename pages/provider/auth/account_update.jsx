import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import { Form, Input, Divider, Button } from "antd";
import AfterRegisterController from "extras/controllers/AfterRegisterController";
import { MainLayout } from "extras/Layout/MainLayout";
import StateView from "extras/components/StateView/StateView";
import { AuthEditLayout } from "extras/Layout/AuthEditLayout";
import { useTranslation } from "react-i18next";
import Router from "next/router";

const controller = new AfterRegisterController();

const { Item } = Form;

const Account_Update = inject("coreProviderStore")(
  observer(({ coreProviderStore }) => {
    const { t } = useTranslation();

    useEffect(() => {
      controller.getUserInfo();
    }, []);

    const RouteHandler = () => {
      Router.push("/provider/auth/change_password");
    };

    // validation messages
    const validateMessages = {
      required: t("provider:account_update.required"),
      string: {
        min: t("provider:account_update.min"),
        max: t("provider:account_update.max"),
        range: t("provider:account_update.range"),
      },
    };

    return (
      <>
        <StateView state={controller.stateview}>
          <MainLayout>
            <div className="main_sec">
              <div className="title-box">
                <h2>{t("provider:account_update.title")}</h2>
                <Button className="typic_btn" onClick={RouteHandler}>
                  {t("provider:account_update.change-pass-btn")}
                </Button>
              </div>
              <Divider className="dvider" />

              <AuthEditLayout
                formType="account_update"
                controller={controller}
                t={t}
                validateMessages={validateMessages}
                button={t("provider:account_update.button")}
              >
                <Item
                  className="form_item"
                  name="name"
                  label={t("provider:account_update.name")}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Item>
                <Item
                  className="form_item"
                  name="family"
                  label={t("provider:account_update.family")}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Item>
                <Item
                  className="form_item"
                  name="email"
                  label={t("provider:account_update.email")}
                  rules={[{ required: true }, { type: "email" }]}
                >
                  <Input />
                </Item>
              </AuthEditLayout>
            </div>
          </MainLayout>
        </StateView>
      </>
    );
  })
);

export default Account_Update;
