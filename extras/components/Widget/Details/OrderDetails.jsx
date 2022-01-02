import React, { useEffect, useState } from 'react'

import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
  DollarOutlined,
  Loading3QuartersOutlined,
  CheckOutlined,
  SecurityScanTwoTone,
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
  Tag,
} from 'antd'
import { ModalOrderAccept } from 'extras/components/Modals/ModalOrderAccept'
import CurrencyFormat from 'react-currency-format'
import Link from 'next/link'

const { Option } = Select
const { Step } = Steps

export const OrderDetails = observer(
  ({ controller, data, price_from, price_to, t }) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [state, setState] = useState(currentState)

    const customDot = (dot, { status, index }) => (
      <Popover
        content={
          <span>
            step {index} status: {status}
          </span>
        }
      >
        {dot}
      </Popover>
    )

    const { currentState } = controller

    const acceptOrder = () => {
      controller.acceptOrderview(
        { order_id: data.id, type: 1 },
        { id: data.id },
      )
    }

    // open modal
    const openModal = () => {
      setIsModalVisible(true)
    }

    // on finish form
    const onFinish = (values) => {
      console.log(values)
      controller.acceptOrderview({ ...values, order_id: data.id, type: 0 })
      controller.getOrderview({ order_id: data.id })
    }

    const { user, content, status } = data

    const orderState =
      status === 'pending'
        ? 'process'
        : status === 'in_queue'
        ? 'process'
        : status === 'completed'
        ? 'finish'
        : status === 'ended'
        ? 'error'
        : ''

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

    return (
      <>
        <ModalOrderAccept
          title={t('provider:singleOrder.report')}
          t={t}
          openModal={openModal}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        >
          <Form layout={'vertical '} onFinish={onFinish}>
            <Form.Item
              name="comment"
              label={t('provider:singleOrder.report-form-desc')}
            >
              <Input.TextArea />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              {t('provider:singleOrder.accept')}
            </Button>
          </Form>
        </ModalOrderAccept>
        <div className="details" dir="rtl">
          <div className="details_wrapper">
            <div className="order_details">
              <div className="top_contents">
                <span className="_prefix">
                  {t('provider:singleOrder.order-number')}
                </span>
                <span>{data.order_number}</span>
                <Divider type="vertical" />
                <span className="_prefix">
                  {t('provider:singleOrder.order-created-at')}
                </span>
                <span>{data.created_at}</span>
              </div>
              <Divider className="dvider" />
              <div className="name-family">
                <span className="_prefix">
                  {t('provider:singleOrder.name')}
                </span>
                <span>{user.name}</span>
                <Divider type="vertical" />
                <span className="_prefix">
                  {t('provider:singleOrder.family')}
                </span>
                <span>{user.family}</span>
              </div>
              <Divider className="dvider" />

              <div className="cont-details">
                <div className="det-item">
                  <span className="_prefix">
                    {t('provider:singleOrder.video-link')}
                  </span>
                  <Link href={data.video_link}>{data.video_link}</Link>
                </div>
                <div className="det-item">
                  <span className="_prefix">
                    {t('provider:singleOrder.booked-days')}
                  </span>
                  <span>
                    {data.content.days} {t('provider:singleOrder.day')}
                  </span>
                </div>
                <div className="det-item">
                  <span className="_prefix">
                    {t('provider:singleOrder.price')}
                  </span>
                  <span>
                    <CurrencyFormat
                      value={data.amount}
                      displayType={'text'}
                      thousandSeparator={true}
                      suffix={' ' + 'تومان'}
                      renderText={(value) => <div>{value}</div>}
                    />
                  </span>
                </div>
                <div className="det-item">
                  <span className="_prefix">وضعیت سفارش :</span>
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
                </div>
                <div className="det-desc">
                  <span className="_prefix">
                    {t('provider:singleOrder.desc')}
                  </span>
                  <span>{data.description}</span>
                </div>
              </div>
              <Divider className="dvider" />
              <div className="order_steps">
                <div className="steps_title">
                  <h4> {t('provider:singleOrder.order-levels')}</h4>
                </div>
                <div className="step-content">
                  <Steps
                    // responsive={true}
                    size="small"
                    status={orderState}
                    current={currentState}
                  >
                    <Step title={t('provider:singleOrder.paymented')} />
                    <Step
                      title={t('provider:singleOrder.pending')}
                      status={status === 'pending' ? 'process' : ''}
                      description={
                        status === 'pending' && (
                          <div className="desc">
                            <div className="step_title">
                              {t('provider:singleOrder.accept-order')}
                            </div>

                            <div className=" step-btns">
                              <Button
                                className="stp-btn typic_btn"
                                loading={controller.loading}
                                onClick={acceptOrder}
                              >
                                {t('provider:singleOrder.accept')}
                              </Button>
                              <Button
                                className="report-btn typic_btn"
                                onClick={openModal}
                              >
                                {t('provider:singleOrder.report')}
                              </Button>
                            </div>
                          </div>
                        )
                      }
                    />
                    <Step title={t('provider:singleOrder.in_queue')} />
                    <Step title={t('provider:singleOrder.in_progress')} />
                    <Step title={t('provider:singleOrder.finish')} />
                  </Steps>
                </div>
              </div>
              <Divider className="dvider" />

              <div className="order_content">
                <div className="content_thumb">
                  <img src={data.content.thumbnail} alt="" />
                </div>
                <div className="cont_title">
                  <h4 className="order-title">{data.content.title}</h4>

                  <div className="det-item">
                    <span className="_prefix">
                      {t('provider:singleOrder.video-count')}
                    </span>
                    <span>{content.view_count}</span>
                  </div>
                  <div className="det-item">
                    <span className="_prefix">
                      {t('provider:singleOrder.view-count')}
                    </span>
                    <span>{content.price_ads}</span>
                  </div>
                  <div className="det-item">
                    <span className="_prefix">
                      {t('provider:singleOrder.holding-days')}
                    </span>
                    <span>
                      {content.days}
                      {t('provider:singleOrder.day')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  },
)
