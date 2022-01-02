import React, { useEffect, useState } from 'react'

import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
  DollarOutlined,
  Loading3QuartersOutlined,
  CheckOutlined,
} from '@ant-design/icons'
import { observer } from 'mobx-react'
import {
  Card,
  Form,
  Radio,
  Slider,
  Select,
  Steps,
  Popover,
  Button,
  Divider,
  Input,
} from 'antd'
import { ModalOrderAccept } from 'extras/components/Modals/ModalOrderAccept'
import Router from 'next/router'
import OrderController from 'extras/controllers/OrderController'
import StateView from 'extras/components/StateView/StateView'
import { MainController } from 'extras/controllers/MainController'

const { Option } = Select
const { Step } = Steps

export const CalendarModalDetails = observer(({ controller, data }) => {
  const showHandler = () => {
    Router.push(`/provider/order_single/${data.id}`)
  }

  return (
    <>
      <StateView state={controller.stateview}>
        <div className="calender_details_modal">
          <div className="event_title">
            <h4>{data.content.title}</h4>
          </div>
          <div className="thumb">
            <img src={data.content.thumbnail} alt="" />
          </div>
          <div className="info">
            <div className="item">
              <span className="title">شماره سفارش :</span>
              <span>{data.order_number}</span>
            </div>
            <div className="item">
              <span className="title">تاریخ شروع :</span>
              <span>{data.date_from}</span>
            </div>
            <div className="item">
              <span className="title">تاریخ پایان :</span>
              <span>{data.date_to}</span>
            </div>
            <div className="item">
              <span className="title">میزان :</span>
              <span>{data.amount}</span>
            </div>
            <div className="item">
              <span className="title">وضعیت :</span>
              <span>{data.status}</span>
            </div>
            <div className="item">
              <span className="title"> : تاریخ ایجاد</span>
              <span>{data.created_at}</span>
            </div>
          </div>
          <div className="show_more">
            <Button type="primary" onClick={showHandler} block>
              مشاهده جزییات بیشتر
            </Button>
          </div>
        </div>
      </StateView>
    </>
  )
})
