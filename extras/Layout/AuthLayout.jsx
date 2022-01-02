import React from "react";
import { Form, Button, Card, Divider } from "antd";
import Link from "next/link";

import { observer, inject } from "mobx-react";
import Router from "next/router";
import Image from "next/image";

const { Item } = Form;

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

export const AuthLayout = inject("coreProviderStore")(
  observer(
    ({
      coreProviderStore,
      formType,
      formTitle,
      formBtn,
      formTopic,
      children,
      controller,
      logo,
      query,
      t,
    }) => {
      // on finish functions
      const onFinish = (values) => {
        console.log("Received values of form: ", values);
        if (formType === "register") {
          controller.RegisterNewUser(values);
        } else if (formType === "register_done") {
          Router.push("/provider/auth/login");
        } else if (formType === "register_error") {
          Router.push("resend_email");
        } else if (formType === "register_success") {
          Router.push("/provider/auth/login");
        } else if (formType === "forgot_password") {
          controller.sendForgetPassword(values);
        } else if (formType === "new_password") {
          controller.sendPassReset({
            ...values,
            token: query.token,
            email: query.email,
          });
        } else if (formType === "reset_password") {
          Router.push("/provider/auth/login");
        } else if (formType === "login") {
          controller.LoginUser(values, (data) => {
            coreProviderStore.setProviderData(data);
          });
        }
      };

      // validation messages
      const validateMessages = {
        required: "لطفا ${label} را وارد کنید",
        types: {
          email: "لطفا ایمیل خود را واد کنید!",
          number: "${label} صحیح نمی باشد!",
          hex: "تکرار کلمه عبور صحیح نمی باشد ",
        },
        number: {
          range: "${label} باید بین ${min} and ${max} باشد",
        },
        string: {
          min: "'${name}' نباید بیشتر از ${min} کاراکتر داشته باشد",
          max: "'${name}' نباید بیشتر از ${max} کاراکتر داشته باشد",
          range:
            "'${label}' باید حد اقل بین ${min} تا ${max} کاراکتر داشته باشد",
        },
      };

      const routerHandler = () => {
        Router.replace("/provider/dashboard");
      };

      return (
        <div className="auth_sec">
          <Image
            className="logo"
            src="/youtube.svg"
            height={100}
            width={200}
            onClick={routerHandler}
          />
          <Card>
            <Form
              {...formItemLayout}
              className="auth_form"
              layout="vertical "
              onFinish={onFinish}
              scrollToFirstError
              validateMessages={validateMessages}
            >
              {/* form topic  */}
              <div className="form_item">
                {formType === "register_success" && (
                  <h4 className="form_title change_success">{formTitle}</h4>
                )}
                {formType === "register_error" && (
                  <>
                    <h4 className="form_title change_error">{formTitle}</h4>
                  </>
                )}
                <>
                  <h4 className="form_topic">{formTopic}</h4>
                  {/* <Divider /> */}
                </>
              </div>
              {/* form content  */}
              {children}
              {/* form action  */}
              <Button
                type="primary"
                htmlType="submit"
                loading={controller.loading}
                block
              >
                {formBtn}
              </Button>
              {/* just for register and login and register_error  */}
              {formType === "login" && (
                <div className="form_item form_question">
                  <Link href="/provider/auth/forgot_password">
                    {t("provider:login.forget_pass")}
                  </Link>
                </div>
              )}
              {/* just for register and login and register_error  */}
              {formType === "register" && (
                <div className="form_item form_question">
                  <span>{t("provider:register.go_to_login")}</span>
                  <Link href="/provider/auth/login">
                    {t("provider:register.sign_in")}
                  </Link>
                </div>
              )}{" "}
              {formType === "login" && (
                <div className="form_item form_question">
                  <span>{t("provider:login.go_to_register")}</span>
                  <Link href="/provider/auth/register">
                    {t("provider:login.sign_up")}
                  </Link>
                </div>
              )}{" "}
              {formType === "register_error" && (
                <div className="form_item form_question">
                  <Link href="/provider/auth/register">
                    {t("provider:register_confirm.resign")}
                  </Link>
                </div>
              )}
              {formType === "register" && (
                <div className="form_item form_end">
                  با ورود و یا ثبت نام در این سایت شما شرایط و قوانین استفاده از
                  سرویس های این سایت و{" "}
                  <Link href="/provider/auth/register">قوانین حریم خصوصی</Link>{" "}
                  آن را می‌پذیرید.
                </div>
              )}
              {formType === "login" && (
                <div className="form_item form_end">
                  با ورود و یا ثبت نام در این سایت شما شرایط و قوانین استفاده از
                  سرویس های این سایت و{" "}
                  <Link href="/provider/auth/register">قوانین حریم خصوصی</Link>{" "}
                  آن را می‌پذیرید.
                </div>
              )}
            </Form>
          </Card>
        </div>
      );
    }
  )
);
