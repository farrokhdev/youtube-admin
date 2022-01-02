import React, { useState } from 'react'
import { Form, Input, InputNumber, Button, Select, Radio, Card } from 'antd'
import { observer } from 'mobx-react'

const formItemLayout = {
  labelCol: {
    xs: {
      span: 0,
      offset: 0,
    },
    sm: {
      span: 0,
      offset: 0,
    },
  },
  wrapperCol: {
    xs: {
      span: 0,
      offset: 0,
    },
    sm: {
      span: 0,
      offset: 0,
    },
  },
}

export const DetailsAddForm = observer(
  ({
    children,
    controller,
    channelId,
    channel_id,
    id,
    title,
    type,
    setAdd,
    isModalVisible,
    setIsModalVisible,
    update,
    price_ads,
    t,
  }) => {
    const onFinish = (values) => {
      if (type === 'channel') {
        controller.addChannel({ ...values, channelId })
      } else if (type === 'content') {
        controller.sendContent({ ...values, price_ads, channel_id, id })
        setIsModalVisible(false)
      } else if (type === 'content_item') {
        controller.sendContent({ ...values, channel_id, id })
        setIsModalVisible(false)
      }
    }

    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: t('provider:details.email_required'),
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    }

    return (
      <Card className="detail_form">
        <Form
          {...formItemLayout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          layout="vertical"
          className="detail_form"
        >
          <h2>{title}</h2>

          {/* form items  */}
          {children}
          {/* form items  */}
          <div className="btn_wrapper">
            <Button type="primary" htmlType="submit">
              {t('provider:detail_form.send')}
            </Button>
            {type === 'content' && (
              <Button
                type="primary"
                className="goback"
                onClick={() => setAdd(false)}
              >
                {t('provider:details.return')}
              </Button>
            )}
          </div>
        </Form>
      </Card>
    )
  },
)
