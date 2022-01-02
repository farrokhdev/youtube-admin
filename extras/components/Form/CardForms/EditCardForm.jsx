import React from "react";
import { Form, Input, Button, Checkbox, Upload, Divider } from "antd";
import { observer } from "mobx-react";

const { Item } = Form;

export const EditCardForm = observer(({ controller, t, setIsModalVisible }) => {
  const onFinish = (values) => {
    controller.updateCard(values, () => {
      controller.getCardInfo();
    });
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const initialValues = {
    bank: controller.card.bank,
    card_number: controller.card.card_number,
    card_owner_name: controller.card.card_owner_name,
    bank_sheba: controller.card.bank_sheba,
  };

  return (
    <>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        className="ticket_form"
        name="basic"
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <div className="title">
          <h4>{t("provider:bank-account.edit-form-title")}</h4>
        </div>
        <Divider />
        <Item
          name="bank"
          label={t("provider:bank-account.bank")}
          rules={[{ required: true }]}
        >
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
            {t("provider:bank-account.form-edit-btn")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
});
