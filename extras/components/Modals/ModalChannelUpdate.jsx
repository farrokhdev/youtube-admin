import React, { useState } from "react";
import { Modal, Button, Divider, Form, Radio, Select } from "antd";

import { AudioOutlined, PlusOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import { ChannelUpdateForm } from "../Form/ChannelUpdateForm";
import StateView from "../StateView/StateView";

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const { Option } = Select;

export const ModalChannelUpdate = observer(
  ({
    controller,
    title,
    button,
    isModalVisible,
    setIsModalVisible,
    showModal,
    categories,
    channel_id,
    channelSingle,
    t,
  }) => {
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const initialValue = {
      category_id: channelSingle.category.id,
      is_activated: channelSingle.is_activated,
    };

    console.log(channelSingle.is_activated);

    return (
      <div className="open_modal">
        <Modal
          title={title}
          visible={isModalVisible}
          okText={"تایید"}
          cancelText="انصراف"
          okType="default"
          onOk={showModal}
          onCancel={handleCancel}
        >
          <StateView state={controller.stateview}>
            <ChannelUpdateForm
              t={t}
              channel_id={channel_id}
              controller={controller}
              initialValue={initialValue}
            >
              <Form.Item
                name="category_id"
                label={t("provider:detail_form.category")}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: t("provider:detail_form.category_alert"),
                  },
                ]}
              >
                <Select
                  // defaultValue={channelSingle.category.title}
                  placeholder={t("provider:detail_form.category_place")}
                >
                  {categories.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.title}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="is_activated"
                label={t("provider:detail_form.status")}
              >
                <Radio.Group>
                  <Radio value={0}>{t("provider:detail_form.deactive")}</Radio>
                  <Radio value={1}>{t("provider:detail_form.active")}</Radio>
                </Radio.Group>
              </Form.Item>
            </ChannelUpdateForm>
          </StateView>
        </Modal>
      </div>
    );
  }
);
