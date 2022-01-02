import React, { useState, useEffect } from "react";
import { MainLayout } from "extras/Layout/MainLayout";
import { ListTable } from "extras/components/Table/ListTable";
import { Button, Divider, Space, DatePicker, Tag } from "antd";
import StateView from "extras/components/StateView/StateView";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import FinanceController from "extras/controllers/FinanceController";
import CurrencyFormat from "react-currency-format";
import moment from "moment";
import { ModalAddCard } from "extras/components/Modals/ModalAddCard";
import { AddCardForm } from "extras/components/Form/CardForms/AddCardForm";
import { EditCardForm } from "extras/components/Form/CardForms/EditCardForm";
import Router from "next/router";
import { useRouter } from "next/router";

const controller = new FinanceController();

const settelment_details = observer(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    controller.getSettelmentView({ id: router.query.id });
  }, []);

  const { settelment } = controller;

  const RouteHandler = () => {
    Router.push("/provider/settelments");
  };
  const RouteHandler2 = () => {
    Router.push("/provider/incomes");
  };

  const colorHanler = (e) => {
    if (e === "paymented") {
      return "green";
    } else if (e === "problem") {
      return "red";
    } else if (e === "pending") {
      return "orange";
    } else if (e === "in_queue") {
      return "gold";
    } else if (e === "in_progress") {
      return "lime";
    } else if (e === "ended") {
      return "blue";
    } else {
      return;
    }
  };

  const addModal = () => {
    setIsModalVisible(true);
  };
  const editModal = () => {
    setIsModalVisible(true);
  };

  return (
    <StateView state={controller.stateview}>
      <MainLayout>
        <div className="main_sec">
          <div className="title-box">
            <h2>{t("provider:singleSettelment.title")}</h2>

            <Button className="typic_btn m_right" onClick={RouteHandler}>
              {t("provider:singleSettelment.button")}
            </Button>
            <Button className="typic_btn" onClick={RouteHandler2}>
              {t("provider:singleSettelment.button-second")}
            </Button>
          </div>
          <Divider />
          <div className="bank_account">
            {settelment.id ? (
              <>
                <div className="items">
                  <span className="first">
                    {t("provider:singleSettelment.deposit")}{" "}
                  </span>
                  <span>{settelment.amount}</span>
                </div>
                <div className="items">
                  <span className="first">
                    {t("provider:singleSettelment.status")}{" "}
                  </span>

                  {settelment.status === "paymented" ? (
                    <Tag color={colorHanler(settelment.status)}>
                      {t("provider:tableList.tags.paymented")}
                    </Tag>
                  ) : settelment.status === "problem" ? (
                    <Tag color={colorHanler(settelment.status)}>
                      {t("provider:tableList.tags.problem")}
                    </Tag>
                  ) : settelment.status === "pending" ? (
                    <Tag color={colorHanler(settelment.status)}>
                      {t("provider:tableList.tags.pending")}
                    </Tag>
                  ) : settelment.status === "in_queue" ? (
                    <Tag color={colorHanler(settelment.status)}>
                      {t("provider:tableList.tags.in_queue")}
                    </Tag>
                  ) : settelment.status === "in_progress" ? (
                    <Tag color={colorHanler(settelment.status)}>
                      {t("provider:tableList.tags.in_progress")}
                    </Tag>
                  ) : settelment.status === "ended" ? (
                    <Tag color={colorHanler(settelment.status)}>
                      {t("provider:tableList.tags.ended")}
                    </Tag>
                  ) : settelment.status === "complited" ? (
                    <Tag color={colorHanler(settelment.status)}>
                      {t("provider:tableList.tags.completed")}
                    </Tag>
                  ) : (
                    ""
                  )}
                </div>
                <div className="items">
                  <span className="first">
                    {t("provider:singleSettelment.bank")}
                  </span>
                  <span>{settelment.bank}</span>
                </div>
                <div className="items">
                  <span className="first">
                    {t("provider:singleSettelment.card-name")}
                  </span>
                  <span>{settelment.card_owner_name}</span>
                </div>
                <div className="items">
                  <span className="first">
                    {t("provider:singleSettelment.shaba")}
                  </span>
                  <span>{settelment.bank_sheba}</span>
                </div>
                <div className="items">
                  <span className="first">
                    {t("provider:singleSettelment.card-number")}
                  </span>
                  <span>{settelment.card_number}</span>
                </div>
                <div className="items">
                  <span className="first">
                    {t("provider:singleSettelment.deposited-at")}
                  </span>
                  <span>{settelment.deposited_at}</span>
                </div>
              </>
            ) : (
              <div className="items">
                <span className="first">
                  {t("provider:singleSettelment.enter-bank-info")}
                </span>
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    </StateView>
  );
});

export default settelment_details;
