import React from "react";
import { Button, Card, Col, Divider, Tag } from "antd";
import { observer } from "mobx-react";

export const TicketSidebar = observer(({ ticketData, ticketController, t }) => {
  const handleClose = () => {
    ticketController.closeTicket({ ticket_id: ticketData.id });
  };

  const colorHanler = (e) => {
    if (e === "responsed") {
      return "green";
    }
    if (e === "closed") {
      return "red";
    }
    if (e === "pending") {
      return "orange";
    }
    if (e === "answered") {
      return "green";
    }
    if (e === "user_response") {
      return "blue";
    } else {
      return "blue";
    }
  };

  return (
    <Card
      title={t("provider:ticketSingle.sidebar-title")}
      className="ticket_sidebar"
    >
      <div className="tik_cont">
        <span>{t("provider:ticketSingle.title")}</span>
        <span>{ticketData.subject}</span>
      </div>
      <Divider />
      <div className="tik_cont">
        <span>{t("provider:ticketSingle.department")}</span>
        <span>{ticketData.department}</span>
      </div>
      <Divider />
      <div className="tik_cont">
        <span>{t("provider:ticketSingle.ticket-num")}</span>
        <span>{ticketData.ticket_number}</span>
      </div>
      <Divider />
      <div className="tik_cont">
        <span>{t("provider:tableList.status")}</span>

        {ticketData.status === "closed" ? (
          <Tag color={colorHanler(ticketData.status)}>
            {t("provider:tableList.ticket-tags.closed")}
          </Tag>
        ) : ticketData.status === "pending" ? (
          <Tag color={colorHanler(ticketData.status)}>
            {t("provider:tableList.ticket-tags.pending")}
          </Tag>
        ) : ticketData.status === "responsed" ? (
          <Tag color={colorHanler(ticketData.status)}>
            {t("provider:tableList.ticket-tags.responsed")}
          </Tag>
        ) : ticketData.status === "answered" ? (
          <Tag color={colorHanler(ticketData.status)}>
            {t("provider:tableList.ticket-tags.answered")}
          </Tag>
        ) : ticketData.status === "user_response" ? (
          <Tag color={colorHanler(ticketData.status)}>
            {t("provider:tableList.ticket-tags.user_response")}
          </Tag>
        ) : (
          ""
        )}
      </div>
      <Divider />

      <div className="tik_cont">
        {ticketController.ticket_close !== "closed" && (
          <Button block onClick={handleClose} className="typic_btn">
            {t("provider:ticketSingle.close-ticket-btn")}
          </Button>
        )}
      </div>
    </Card>
  );
});
