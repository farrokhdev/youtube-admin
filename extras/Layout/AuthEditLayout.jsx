import React, { useState } from "react";
import { Form, Button, Card, Divider } from "antd";
import Link from "next/link";
import { observer, inject } from "mobx-react";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 0,
      offset: 0,
    },
    sm: {
      span: 0,
      offset: 0,
    },
  },
  wrapperCol: {
    xs: {
      span: 0,
      offset: 0,
    },
    sm: {
      span: 0,
      offset: 0,
    },
  },
};

export const AuthEditLayout = inject("coreProviderStore")(
  observer(
    ({
      formType,
      formTitle,
      formTopic,
      children,
      setReg,
      reg,
      controller,
      coreProviderStore,
      button,
      validateMessages,
    }) => {
      const onFinish = (values) => {
        if (formType === "account_update") {
          console.log("Received values of form: ", values);
          controller.accountUpdate(values, async (data) => {
            console.log(data);
            coreProviderStore.setProviderData(data);
            await localStorage.setItem("name", data.name);
            await localStorage.setItem("family", data.family);
            await localStorage.setItem("email", data.email);
          });
        } else if (formType === "change_password") {
          console.log("Received values of form: ", values);

          controller.changePass(values);
        }
      };

      const initValues = {
        name: controller.provider.name,
        family: controller.provider.family,
        email: controller.provider.email,
      };

      return (
        <Card>
          <Form
            {...formItemLayout}
            className="auth_form"
            layout="vertical "
            onFinish={onFinish}
            scrollToFirstError
            initialValues={initValues}
            validateMessages={validateMessages}
          >
            {children}

            <Button
              className="global_btn"
              loading={controller.loading}
              type="primary"
              htmlType="submit"
            >
              {button}
            </Button>
          </Form>
        </Card>
      );
    }
  )
);
