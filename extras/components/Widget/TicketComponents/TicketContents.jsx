import { Collapse, Button, Divider, Card } from "antd";
import { observer } from "mobx-react";
import { TicketSidebar } from "./TicketSidebar";
import { ReplyForm } from "./ReplyForm";
import Router from "next/router";

const { Panel } = Collapse;

export const TicketContents = observer(
  ({
    ticketData,
    ticketController,
    handleUpload,
    normFile,
    seeAttach,
    seeRepAttach,
    t,
  }) => {
    return (
      <Card className="ticket_content" span={17} offset={1}>
        <Collapse accordion>
          <Panel header={t("provider:ticketSingle.reply")} key="1">
            <ReplyForm
              loading={ticketController.loading}
              ticketData={ticketData}
              ticketController={ticketController}
              handleUpload={handleUpload}
              normFile={normFile}
              t={t}
            />
          </Panel>
        </Collapse>

        <Divider />

        <div className="repticket_items">
          {ticketData.replies &&
            ticketData.replies.map((item, indx) => {
              return (
                <div key={indx} className="ticket_item">
                  <div className="item_header">
                    <span>{item.sender_from}</span>
                    <span>
                      {t("provider:tableList.created_at") +
                        " " +
                        " " +
                        item.created_at}
                    </span>
                  </div>
                  <div className="item_body">
                    <p>{item.message}</p>
                    <Divider />

                    {ticketData.attache && (
                      <div className="ticket_attach">
                        <span>{t("provider:tickets.see_attach")}</span>
                        <Button
                          className="typic_btn"
                          onClick={() => seeRepAttach(item.attach)}
                        >
                          {t("provider:tickets.download_attch")}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

          <div className="ticket_items"></div>
          <div className="ticket_item">
            <div className="item_header">
              <span>{ticketData.subject}</span>
              <span>
                {t("provider:tickets.ticket_num") +
                  " " +
                  " " +
                  ticketData.ticket_number}
              </span>
            </div>
            <div className="item_body">
              <p>{ticketData.message}</p>
              <Divider />

              {ticketData.attache && (
                <div className="ticket_attach">
                  <span>{t("provider:tickets.see_attach")}</span>
                  <Button onClick={seeAttach}>
                    {t("provider:tickets.download_attch")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }
);
