import React, { useState, useEffect } from "react";
import { MainLayout } from "extras/Layout/MainLayout";
import { ListTable } from "extras/components/Table/ListTable";
import { Button, Divider, Space, DatePicker } from "antd";
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

const { RangePicker } = DatePicker;

const controller = new FinanceController();

const bank_account = observer(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    controller.getCardInfo();
  }, []);

  const RouteHandler = () => {
    Router.push("/provider/settelments");
  };
  const RouteHandler2 = () => {
    Router.push("/provider/incomes");
  };

  console.log(controller.card);

  const addModal = () => {
    setIsModalVisible(true);
  };
  const editModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      {/* modals  */}
      {controller.card.id ? (
        <ModalAddCard
          showModal={addModal}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          t={t}
        >
          <StateView state={controller.stateview}>
            <EditCardForm
              controller={controller}
              setIsModalVisible={setIsModalVisible}
              t={t}
            />
          </StateView>
        </ModalAddCard>
      ) : (
        <ModalAddCard
          showModal={addModal}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          t={t}
        >
          <StateView state={controller.stateview}>
            <AddCardForm
              controller={controller}
              setIsModalVisible={setIsModalVisible}
              t={t}
            />
          </StateView>
        </ModalAddCard>
      )}

      {/* modals  */}
      <MainLayout>
        <div className="main_sec">
          <div className="title-box">
            <h2>{t("provider:bank-account.title")}</h2>

            <Button className="typic_btn m_right" onClick={RouteHandler}>
              {t("provider:bank-account.button")}
            </Button>
            <Button className="typic_btn" onClick={RouteHandler2}>
              {t("provider:bank-account.button-second")}
            </Button>
          </div>
          <Divider className="dvider" />

          <StateView state={controller.stateview}>
            <div className="bank_account">
              <div className="edit_bank_account">
                {controller.card.id ? (
                  <>
                    <Button
                      className="typic_btn"
                      type="primary"
                      onClick={editModal}
                    >
                      {t("provider:bank-account.edit-bank-acc-btn")}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="typic_btn"
                      type="primary"
                      onClick={addModal}
                    >
                      {t("provider:bank-account.bank-acc-btn")}
                    </Button>
                  </>
                )}
              </div>
              {controller.card.id ? (
                <>
                  <div className="items">
                    <span className="first">
                      {t("provider:bank-account.bank")}
                    </span>
                    <span>{controller.card.bank}</span>
                  </div>
                  <div className="items">
                    <span className="first">
                      {t("provider:bank-account.card-name")}
                    </span>
                    <span>{controller.card.card_owner_name}</span>
                  </div>
                  <div className="items">
                    <span className="first">
                      {t("provider:bank-account.shaba")}
                    </span>
                    <span>{controller.card.bank_sheba}</span>
                  </div>
                  <div className="items">
                    <span className="first">
                      {t("provider:bank-account.card-number")}
                    </span>
                    <span>{controller.card.card_number}</span>
                  </div>
                </>
              ) : (
                <div className="items">
                  <span className="first">
                    {t("provider:bank-account.enter-bank-info")}
                  </span>
                </div>
              )}
            </div>
          </StateView>
        </div>
      </MainLayout>
    </>
  );
});

export default bank_account;
