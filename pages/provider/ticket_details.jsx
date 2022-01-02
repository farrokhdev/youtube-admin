import React, { useEffect } from "react";
import { Button, Collapse, Divider, Row, Col } from "antd";
import { observer } from "mobx-react";
import TicketController from "extras/controllers/TicketController";
import { MainLayout } from "extras/Layout/MainLayout";
import { useRouter } from "next/router";
import StateView from "extras/components/StateView/StateView";
import { TicketDetails } from "extras/components/Widget/TicketComponents/TicketDetails";
import Router from "next/router";
import { useTranslation } from "react-i18next";

const ticketController = new TicketController();

const ticket_details = observer(() => {
  const { t } = useTranslation();

  const router = useRouter();
  const callback = (key) => {
    console.log(key);
  };

  const gotoAllTickets = () => {
    Router.push("/provider/tickets");
  };
  const gotoAddTicket = () => {
    Router.push("/provider/send_ticket");
  };

  useEffect(() => {
    ticketController.getTicket({ ticket_id: router.query.id });
  }, []);

  console.log(ticketController.singleTicket);
  return (
    <MainLayout>
      <Row className="goto">
        <Button className="typic_btn" onClick={gotoAddTicket}>
          {t("provider:ticketSingle.button")}
        </Button>
        <Button className="typic_btn" onClick={gotoAllTickets}>
          {t("provider:ticketSingle.button-second")}
        </Button>
      </Row>
      <Divider />
      <StateView state={ticketController.stateview}>
        <TicketDetails
          ticketData={ticketController.ticketItem}
          callback={callback}
          ticketController={ticketController}
          t={t}
        />
      </StateView>
    </MainLayout>
  );
});

export default ticket_details;
