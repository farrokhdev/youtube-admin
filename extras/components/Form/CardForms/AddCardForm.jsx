import React from "react";
import { Form, Input, Button, Checkbox, Upload, Divider } from "antd";
import { observer } from "mobx-react";

const { Item } = Form;

export const AddCardForm = observer(({ controller, t, setIsModalVisible }) => {
  const onFinish = (values) => {
    controller.addCard(values);
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
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
        <div className="title">
          <h4>{t("provider:bank-account.add-form-title")}</h4>
        </div>
        <Divider />
        <Item name="bank" label={"بانک"} rules={[{ required: true }]}>
          <Input />
        </Item>
        <Item
          name="card_number"
          label={t("provider:bank-account.card-number")}
          rules={[{ required: true }]}
        >
          <Input />
        </Item>
        <Item
          name="card_owner_name"
          label={t("provider:bank-account.card-name")}
          rules={[{ required: true }]}
        >
          <Input />
        </Item>
        <Item
          name="bank_sheba"
          label={t("provider:bank-account.shaba")}
          rules={[{ required: true }]}
        >
          <Input />
        </Item>

        <Form.Item layout="inline">
          <Button
            className="typic_btn"
            // loading={controller.loading}
            htmlType="submit"
          >
            {t("provider:bank-account.form-btn")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
});
