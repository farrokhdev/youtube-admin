import React from "react";
import { Collapse } from "antd";
import { observer } from "mobx-react";
import { TicketSidebar } from "./TicketSidebar";
import { ReplyForm } from "./ReplyForm";
import Router from "next/router";
import { TicketContents } from "./TicketContents";

const { Panel } = Collapse;

export const TicketDetails = observer(({ ticketData, ticketController, t }) => {
  const seeAttach = () => {
    Router.push(`${ticketData.attache}`);
  };
  const seeRepAttach = (attach) => {
    Router.push(`${attach}`);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleUpload = (file) => {
    let fromData = new FormData();
    fromData.append("file", file);
    ticketController.uploadTicket(fromData);
  };
  return (
    <div className="ticket_sec">
      <TicketSidebar
        ticketData={ticketData}
        ticketController={ticketController}
        t={t}
      />
      <TicketContents
        ticketData={ticketData}
        ticketController={ticketController}
        handleUpload={handleUpload}
        normFile={normFile}
        seeAttach={seeAttach}
        seeRepAttach={seeRepAttach}
        t={t}
      />
    </div>
  );
});
