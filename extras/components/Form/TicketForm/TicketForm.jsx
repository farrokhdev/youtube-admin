import React, { useRef } from "react";
import { Form, Input, Button, Checkbox, Upload } from "antd";
import { observer } from "mobx-react";

export const TicketForm = observer(
  ({ controller, type, ticket_id, loading, messageRef, t, children }) => {
    console.log(loading);

    const formRef = useRef(null);

    const onFinish = (values) => {
      console.log("Success:", values);
      if (type === "reply") {
        controller.replyTicket({ ...values, ticket_id });
        formRef.current.resetFields();
      } else {
        controller.sendTicket({
          ...values,
          attache: controller.uploadVal,
        });
        formRef.current.resetFields();
      }
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return (
      <>
        <Form
          ref={formRef}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          className="ticket_form"
          name="basic"
          initialValues={{
            department: "technical",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          {children}

          <Form.Item layout="inline">
            <Button className="typic_btn" loading={loading} htmlType="submit">
              {t("provider:ticketSingle.form-btn")}
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
);
