import React, { useState, useEffect } from "react";
import { MainLayout } from "extras/Layout/MainLayout";
import { ListTable } from "extras/components/Table/ListTable";
import {
  Button,
  Divider,
  Space,
  DatePicker,
  InputNumber,
  Form,
  Tooltip,
  Input,
  Collapse,
  Tag,
  Popconfirm,
} from "antd";
import StateView from "extras/components/StateView/StateView";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import FinanceController from "extras/controllers/FinanceController";
import CurrencyFormat from "react-currency-format";
import moment from "moment";
import Router from "next/router";
import { ResponsiveTableList } from "extras/components/Table/ResponsiveTableLIst";
import { values } from "mobx";

const { Panel } = Collapse;

const controller = new FinanceController();

const settelments = observer(() => {
  const { t } = useTranslation();

  const [amountNum, setAmountNum] = useState(0);

  useEffect(() => {
    controller.getSettelmentList();
  }, []);

  useEffect(() => {
    controller.getWalletInfo();
  }, []);

  const RouteHandler = () => {
    Router.push("/provider/bank_account");
  };
  const RouteHandler2 = () => {
    Router.push("/provider/incomes");
  };

  // show settlement view

  const showHandler = (id) => {
    Router.push(`/provider/settelment_details/${id}`);
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

  const columns = [
    {
      title: t("provider:tableList.id"),
      dataIndex: "id",
      width: "10%",
      align: "right",
    },
    {
      title: t("provider:tableList.orders.amount"),
      dataIndex: "amount",
      width: "10%",
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
      title: t("provider:tableList.status"),
      dataIndex: "status",
      width: "20%",
      align: "center",
      render: (ch, data) => {
        return (
          <>
            {data.status === "paymented" ? (
              <Tag color={colorHanler(data.status)}>
                {t("provider:tableList.tags.paymented")}
              </Tag>
            ) : data.status === "problem" ? (
              <Tag color={colorHanler(data.status)}>
                {t("provider:tableList.tags.problem")}
              </Tag>
            ) : data.status === "pending" ? (
              <Tag color={colorHanler(data.status)}>
                {t("provider:tableList.tags.pending")}
              </Tag>
            ) : data.status === "in_queue" ? (
              <Tag color={colorHanler(data.status)}>
                {t("provider:tableList.tags.in_queue")}
              </Tag>
            ) : data.status === "in_progress" ? (
              <Tag color={colorHanler(data.status)}>
                {t("provider:tableList.tags.in_progress")}
              </Tag>
            ) : data.status === "ended" ? (
              <Tag color={colorHanler(data.status)}>
                {t("provider:tableList.tags.ended")}
              </Tag>
            ) : data.status === "complited" ? (
              <Tag color={colorHanler(data.status)}>
                {t("provider:tableList.tags.completed")}
              </Tag>
            ) : (
              ""
            )}
          </>
        );
      },
    },
    {
      title: t("provider:tableList.created_at"),
      dataIndex: "created_at",
      width: "20%",
      align: "center",
    },
    {
      title: t("provider:tableList.actions"),
      dataIndex: "row",
      key: "actions",
      width: "15%",
      align: "center",

      render: (ch, data, i) => (
        <>
          <div className="text-center ">
            <Button
              className="details-btn"
              onClick={() => showHandler(data.id)}
            >
              {t("provider:tableList.see_more")}
            </Button>
          </div>
        </>
      ),
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
          <Divider />
        </>
      ),
    },
    {
      item2: (
        <>
          <div className="item">
            <span className="_title">{t("provider:tableList.title")}</span>
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
          {/* {colorHanler(item.status)} */}
          <div className="item">
            <span className="_title">{t("provider:tableList.status")}</span>
            <span>
              {item.status === "paymented" ? (
                <Tag color={colorHanler(item.status)}>
                  {t("provider:tableList.tags.paymented")}
                </Tag>
              ) : item.status === "problem" ? (
                <Tag color={colorHanler(item.status)}>
                  {t("provider:tableList.tags.problem")}
                </Tag>
              ) : item.status === "pending" ? (
                <Tag color={colorHanler(item.status)}>
                  {t("provider:tableList.tags.pending")}
                </Tag>
              ) : item.status === "in_queue" ? (
                <Tag color={colorHanler(item.status)}>
                  {t("provider:tableList.tags.in_queue")}
                </Tag>
              ) : item.status === "in_progress" ? (
                <Tag color={colorHanler(item.status)}>
                  {t("provider:tableList.tags.in_progress")}
                </Tag>
              ) : item.status === "ended" ? (
                <Tag color={colorHanler(item.status)}>
                  {t("provider:tableList.tags.ended")}
                </Tag>
              ) : item.status === "complited" ? (
                <Tag color={colorHanler(item.status)}>
                  {t("provider:tableList.tags.completed")}
                </Tag>
              ) : (
                ""
              )}
            </span>
          </div>
          <Divider />
        </>
      ),
    },

    {
      item4: (
        <>
          <div className="item">
            <span className="_title">{t("provider:tableList.created_at")}</span>
            <span>{item.created_at}</span>
          </div>
          <Divider />
        </>
      ),
    },
    {
      item5: (
        <>
          <div className="item">
            <span className="_title">{t("provider:tableList.details")}</span>
            <div className="text-center ">
              <Button
                className="details-btn"
                onClick={() => showHandler(item.id)}
              >
                {t("provider:tableList.see_more")}
              </Button>
            </div>
          </div>
          <Divider />
        </>
      ),
    },
  ];

  const onFinish = () => {
    controller.postSettelment({ amount: amountNum });
  };

  // pop confirm
  const confirm = () => {
    onFinish();
  };

  const cancel = (e) => {
    console.log(e);
  };
  // pop confirm

  return (
    <MainLayout>
      <div className="main_sec">
        <div className="title-box">
          <h2>{t("provider:settelments.title")}</h2>
          <Button className="typic_btn m_right" onClick={RouteHandler}>
            {t("provider:settelments.button")}
          </Button>
          <Button className="typic_btn" onClick={RouteHandler2}>
            {t("provider:settelments.button-second")}
          </Button>
        </div>
        <Divider className="dvider" />

        <div className="checkout">
          <StateView state={controller.stateview}>
            <div className="checkout_input">
              <Tooltip
                trigger={["focus"]}
                title={
                  <CurrencyFormat
                    value={amountNum}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={" " + "تومان"}
                    renderText={(value) => <div>{value}</div>}
                  />
                }
                placement="topLeft"
                overlayClassName="numeric-input"
              >
                <InputNumber
                  controls={false}
                  defaultValue={controller.wallet.balance}
                  placeholder={t("provider:settelments.checkout-placeholder")}
                  onChange={(e) => setAmountNum(e)}
                  formatter={(value) =>
                    `تومان ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                />
              </Tooltip>
              <Popconfirm
                title={t("provider:settelments.want-to-pay")}
                onConfirm={() => confirm()}
                onCancel={cancel}
                okText={t("provider:settelments.ok")}
                cancelText={t("provider:settelments.cancel")}
                loading={controller.loading}
              >
                <Button
                  className="typic_btn"
                  htmlType="submit"
                  disabled={controller.success && true}
                >
                  {t("provider:settelments.pay-btn")}
                </Button>
              </Popconfirm>
            </div>
          </StateView>
          <StateView state={controller.stateview}>
            <div className="account_wallet">
              <CurrencyFormat
                value={controller.wallet.balance}
                displayType={"text"}
                thousandSeparator={true}
                prefix={t("provider:settelments.wallet") + " "}
                suffix={" " + "تومان"}
                renderText={(value) => <div>{value}</div>}
              />
            </div>
          </StateView>
        </div>

        <StateView state={controller.stateview}>
          <ListTable
            list={controller.settelmentList}
            loading={controller.loading}
            columns={columns}
          />
          <ResponsiveTableList
            list={controller.settelmentList}
            title={t("provider:tableList.mobile.forSettelment")}
            mobileColumn={mobileColumn}
          />
        </StateView>
      </div>
    </MainLayout>
  );
});

export default settelments;
