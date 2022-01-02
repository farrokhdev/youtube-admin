import React, { useState, useEffect } from "react";
import { MainLayout } from "extras/Layout/MainLayout";
import { ListTable } from "extras/components/Table/ListTable";
import { Button, Divider, Space } from "antd";
import StateView from "extras/components/StateView/StateView";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import FinanceController from "extras/controllers/FinanceController";
import CurrencyFormat from "react-currency-format";
import moment from "moment";
import Router from "next/router";
import { RangeDatePicker } from "jalali-react-datepicker";
import { ResponsiveTableList } from "extras/components/Table/ResponsiveTableLIst";

// const { RangePicker } = DatePicker

const controller = new FinanceController();

const incomes = observer(() => {
  const { t } = useTranslation();

  useEffect(() => {
    controller.getIncomes();
  }, []);
  useEffect(() => {
    controller.getWalletInfo(() => {});
  }, []);

  const RouteHandler = () => {
    Router.push("/provider/bank_account");
  };
  const RouteHandler2 = () => {
    Router.push("/provider/settelments");
  };
  const columns = [
    {
      title: t("provider:tableList.id"),
      dataIndex: "id",
      width: "25%",
      align: "center",
    },
    {
      title: t("provider:tableList.orders.amount"),
      dataIndex: "amount",
      width: "25%",
      align: "center",
      render: (ch, data) => (
        <CurrencyFormat
          value={data.amount}
          displayType={"text"}
          thousandSeparator={true}
          suffix={" " + "تومان"}
          renderText={(value) => <div>{value}</div>}
        />
      ),
    },
    {
      title: t("provider:tableList.created_at"),
      dataIndex: "created_at",
      width: "25%",
      align: "center",
    },
  ];

  const mobileColumn = (item) => [
    {
      item1: (
        <>
          <div className="item">
            <span className="_title">{t("provider:tableList.id")}</span>
            <span>{item.id}</span>
          </div>
          <Divider className="divider" />
        </>
      ),
    },
    {
      item2: (
        <>
          <div className="item">
            <span className="_title">
              {t("provider:tableList.orders.amount")}
            </span>
            <span>
              <CurrencyFormat
                value={item.amount}
                displayType={"text"}
                thousandSeparator={true}
                suffix={" " + "تومان"}
                renderText={(value) => <div>{value}</div>}
              />
            </span>
          </div>
          <Divider />
        </>
      ),
    },

    {
      item3: (
        <>
          <div className="item">
            <span className="_title">{t("provider:tableList.created_at")}</span>
            <span>{item.created_at}</span>
          </div>
          <Divider />
        </>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="main_sec">
        <div className="title-box">
          <h2> {t("provider:incomes.title")}</h2>

          <Button className="typic_btn m_right" onClick={RouteHandler}>
            {t("provider:incomes.button")}
          </Button>
          <Button className="typic_btn" onClick={RouteHandler2}>
            {t("provider:incomes.button-second")}
          </Button>
        </div>
        <Divider className="dvider" />

        <div className="date_picker_box">
          <div className="date-content">
            <RangeDatePicker
              className="date-pick-er"
              fromLabel={t("provider:incomes.start-date")}
              toLabel={t("provider:incomes.end-date")}
              onClickSubmitButton={({ start, end }) => {
                start._i.replace("-//", "");
                end._i.replace("-//", "");
                console.log("start ", start._i);
                console.log("end ", end._i);

                controller.getIncomes({
                  start_date: start._i.replace("-//", ""),
                  end_date: end._i.replace("-//", ""),
                });
              }}
            />
            {controller.wallet.balance.length && (
              <>
                <StateView state={controller.stateview}>
                  <div className="account_balance">
                    <CurrencyFormat
                      value={controller.wallet.balance}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={t("provider:incomes.your-wallet") + " "}
                      renderText={(value) => <div>{value}</div>}
                    />
                  </div>
                </StateView>
              </>
            )}
          </div>
        </div>

        <StateView state={controller.stateview}>
          <ListTable
            list={controller.inComesList}
            loading={controller.loading}
            columns={columns}
            footer={() => {
              return (
                <>
                  <div className="table-footer">
                    {t("provider:incomes.total") +
                      ":" +
                      " " +
                      controller.allIncomes +
                      " " +
                      "تومان"}
                  </div>
                </>
              );
            }}
          />
          <ResponsiveTableList
            list={controller.inComesList}
            title={t("provider:tableList.mobile.forIncomes")}
            mobileColumn={mobileColumn}
            footer={
              t("provider:incomes.total") +
              ":" +
              " " +
              controller.allIncomes +
              " " +
              "تومان"
            }
          />
        </StateView>
      </div>
    </MainLayout>
  );
});

export default incomes;
