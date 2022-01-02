import React, { useState, useRef } from "react";
import { Button, Form, Input, Upload, Row, Col } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { TicketForm } from "extras/components/Form/TicketForm/TicketForm";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";

export const ReplyForm = ({
  ticketData,
  ticketController,
  handleUpload,
  normFile,
  loading,
  t,
}) => {
  const messageRef = useRef(null);
  return (
    <div className="ticket-reply-form">
      <div className="reply_item">
        <TicketForm
          loading={loading}
          type="reply"
          ticket_id={ticketData.id}
          controller={ticketController}
          t={t}
          messageRef={messageRef}
        >
          <Form.Item
            className="ticket_item"
            label={t("provider:ticketSingle.desc")}
            name="message"
            rules={[
              {
                required: true,
                message: "Please fill the message about your issue!",
              },
            ]}
          >
            <Input.TextArea className="ticket_textarea" ref={messageRef} />
          </Form.Item>
          <Form.Item
            className="ticket_item"
            label={t("provider:ticketSingle.send-file")}
            name="attache"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action={handleUpload} listType="picture">
              <Button className="typic_btn" icon={<UploadOutlined />}>
                {t("provider:ticketSingle.upload")}
              </Button>
            </Upload>
          </Form.Item>
        </TicketForm>
      </div>
    </div>
  );
};
