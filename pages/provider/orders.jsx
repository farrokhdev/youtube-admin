import React, { useState, useEffect } from 'react'
import { MainLayout } from 'extras/Layout/MainLayout'
import { ListTable } from 'extras/components/Table/ListTable'
import { Button, Divider, Tag } from 'antd'
import StateView from 'extras/components/StateView/StateView'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import OrderController from 'extras/controllers/OrderController'
import Router from 'next/router'
import CurrencyFormat from 'react-currency-format'
import { ResponsiveTableList } from 'extras/components/Table/ResponsiveTableLIst'

const orderController = new OrderController()

const orders = observer(() => {
  const { t } = useTranslation()

  useEffect(() => {
    orderController.getAllOrders()
  }, [])

  const colorHandler = (e) => {
    if (e === 'paymented') {
      return 'green'
    }
    if (e === 'problem') {
      return 'red'
    }
    if (e === 'pending') {
      return 'orange'
    }
    if (e === 'in_queue') {
      return 'gold'
    }
    if (e === 'in_progress') {
      return 'lime'
    }
    if (e === 'ended') {
      return 'blue'
    }
    if (e === 'completed') {
      return 'green'
    } else {
      return 'blue'
    }
  }
  const showHandler = (id) => {
    Router.push(`/provider/order_single/${id}`)
  }

  const columns = [
    {
      title: t('provider:tableList.orders.order_number'),
      dataIndex: 'order_number',
      key: 'order_number',
      width: '20%',
      align: 'right',
    },

    {
      title: t('provider:tableList.orders.amount'),
      dataIndex: 'amount',
      width: '20%',
      align: 'center',
      render: (ch, data) => (
        <CurrencyFormat
          value={data.amount}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' ' + 'تومان'}
          renderText={(value) => <div>{value}</div>}
        />
      ),
    },
    {
      title: t('provider:tableList.created_at'),
      dataIndex: 'created_at',
      width: '20%',
      align: 'center',
      responsive: ['md'],
    },
    {
      title: t('provider:tableList.status'),
      dataIndex: 'status',
      width: '20%',
      align: 'center',
      responsive: ['md'],

      render: (ch, data) => {
        return (
          <>
            {data.status === 'paymented' ? (
              <Tag color={colorHandler(data.status)}>
                {t('provider:tableList.tags.peymented')}
              </Tag>
            ) : data.status === 'awaiting_payment' ? (
              <Tag color={colorHandler(data.status)}>
                {t('provider:tableList.tags.awaiting_payment')}
              </Tag>
            ) : data.status === 'problem' ? (
              <Tag color={colorHandler(data.status)}>
                {t('provider:tableList.tags.problem')}
              </Tag>
            ) : data.status === 'pending' ? (
              <Tag color={colorHandler(data.status)}>
                {t('provider:tableList.tags.pending')}
              </Tag>
            ) : data.status === 'in_queue' ? (
              <Tag color={colorHandler(data.status)}>
                {t('provider:tableList.tags.in_queue')}
              </Tag>
            ) : data.status === 'in_progress' ? (
              <Tag color={colorHandler(data.status)}>
                {t('provider:tableList.tags.in_progress')}
              </Tag>
            ) : data.status === 'ended' ? (
              <Tag color={colorHandler(data.status)}>
                {t('provider:tableList.tags.ended')}
              </Tag>
            ) : data.status === 'completed' ? (
              <Tag color={colorHandler(data.status)}>
                {t('provider:tableList.tags.completed')}
              </Tag>
            ) : (
              <Tag color={colorHandler(data.status)}>{data.status}</Tag>
            )}
          </>
        )
      },
    },
    {
      title: t('provider:tableList.details'),
      dataIndex: 'row',
      key: 'actions',
      width: '20%',
      align: 'center',

      render: (ch, data, i) => (
        <>
          <div className="text-center">
            <Button
              className="details-btn"
              onClick={() => showHandler(data.id)}
            >
              {t('provider:tableList.see_more')}
            </Button>
          </div>
        </>
      ),
    },
  ]

  const mobileColumn = (item) => [
    {
      item1: (
        <>
          <div className="item">
            <span className="_title"> شماره سفارش</span>
            <span>{item.order_number}</span>
          </div>
          <Divider />
        </>
      ),
    },
    {
      item2: (
        <>
          <div className="item">
            <span className="_title">مبلغ سفارش</span>
            <span>
              <CurrencyFormat
                value={item.amount}
                displayType={'text'}
                thousandSeparator={true}
                suffix={' ' + 'تومان'}
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
            <span className="_title">تاریخ ایجاد</span>
            <span>{item.created_at}</span>
          </div>
          <Divider />
        </>
      ),
    },
    {
      item4: (
        <>
          {/* {colorHanler(item.status)} */}
          <div className="item">
            <span className="_title">وضعیت</span>
            <span>
              {item.status === 'paymented' ? (
                <Tag color={colorHandler(item.status)}>
                  {t('provider:tableList.tags.peymented')}
                </Tag>
              ) : item.status === 'awaiting_payment' ? (
                <Tag color={colorHandler(item.status)}>
                  {t('provider:tableList.tags.awaiting_payment')}
                </Tag>
              ) : item.status === 'problem' ? (
                <Tag color={colorHandler(item.status)}>
                  {t('provider:tableList.tags.problem')}
                </Tag>
              ) : item.status === 'pending' ? (
                <Tag color={colorHandler(item.status)}>
                  {t('provider:tableList.tags.pending')}
                </Tag>
              ) : item.status === 'in_queue' ? (
                <Tag color={colorHandler(item.status)}>
                  {t('provider:tableList.tags.in_queue')}
                </Tag>
              ) : item.status === 'in_progress' ? (
                <Tag color={colorHandler(item.status)}>
                  {t('provider:tableList.tags.in_progress')}
                </Tag>
              ) : item.status === 'ended' ? (
                <Tag color={colorHandler(item.status)}>
                  {t('provider:tableList.tags.ended')}
                </Tag>
              ) : item.status === 'completed' ? (
                <Tag color={colorHandler(item.status)}>
                  {t('provider:tableList.tags.completed')}
                </Tag>
              ) : (
                <Tag color={colorHandler(item.status)}>{item.status}</Tag>
              )}
            </span>
          </div>
          <Divider />
        </>
      ),
    },
    {
      item5: (
        <>
          <div className="item">
            <span className="_title">جزییات سفارش</span>
            <div className="text-center ">
              <Button
                className="details-btn"
                onClick={() => showHandler(item.id)}
              >
                {t('provider:tableList.see_more')}
              </Button>
            </div>
          </div>
          <Divider />
        </>
      ),
    },
  ]

  return (
    <MainLayout>
      <div className="main_sec">
        <div className="title-box">
          <h2>اطلاعات سفارش</h2>
        </div>
        <Divider className="dvider" />

        <StateView state={orderController.stateview}>
          <ListTable
            list={orderController.allOrders}
            loading={orderController.loading}
            columns={columns}
          />
          <ResponsiveTableList
            list={orderController.allOrders}
            title={t('provider:tableList.mobile.forOrders')}
            mobileColumn={mobileColumn}
          />
        </StateView>
      </div>
    </MainLayout>
  )
})

export default orders
