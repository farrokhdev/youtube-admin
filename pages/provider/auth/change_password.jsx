import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import { Divider, Form, Input, Button } from "antd";
import AfterRegisterController from "extras/controllers/AfterRegisterController";
import { MainLayout } from "extras/Layout/MainLayout";
import StateView from "extras/components/StateView/StateView";
import { AuthEditLayout } from "extras/Layout/AuthEditLayout";
import { useTranslation } from "react-i18next";
import Router from "next/router";

const controller = new AfterRegisterController();

const { Item } = Form;

const Change_Password = inject("coreProviderStore")(
  observer(({ coreProviderStore }) => {
    const { t } = useTranslation();

    useEffect(() => {
      controller.getUserInfo();
    }, []);

    const RouteHandler = () => {
      Router.push("/provider/auth/account_update");
    };

    // validation messages
    const validateMessages = {
      required: t("provider:change_password.required"),
      string: {
        min: t("provider:change_password.min"),
        max: t("provider:change_password.max"),
        range: t("provider:change_password.range"),
      },
    };

    return (
      <>
        <MainLayout>
          <div className="main_sec">
            <div className="title-box">
              <h2>{t("provider:change_password.title")}</h2>
              <Button className="typic_btn" onClick={RouteHandler}>
                {t("provider:change_password.change-acc-btn")}
              </Button>
            </div>
            <Divider className="dvider" />
            <AuthEditLayout
              validateMessages={validateMessages}
              formType="change_password"
              controller={controller}
              t={t}
              button={t("provider:change_password.button")}
            >
              <Item
                className="form_item"
                name="old_password"
                label={t("provider:change_password.old_password")}
                rules={[{ required: true }]}
                hasFeedback
              >
                <Input.Password />
              </Item>
              <Item
                className="form_item"
                name="password"
                label={t("provider:change_password.password")}
                rules={[{ required: true }]}
                hasFeedback
              >
                <Input.Password />
              </Item>
              <Item
                className="form_item"
                name="password_confirmation"
                label={t("provider:change_password.repeat_password")}
                rules={[{ required: true }]}
                hasFeedback
              >
                <Input.Password />
              </Item>
            </AuthEditLayout>
          </div>
        </MainLayout>
      </>
    );
  })
);

export default Change_Password;
