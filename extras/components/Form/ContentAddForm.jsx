import React, { useState } from 'react'
import { Form, Input, InputNumber, Button, Select, Radio, Card } from 'antd'
import { observer } from 'mobx-react'
import Router from 'next/router'

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

export const ContentAddForm = observer(
  ({
    children,
    controller,
    contentController,
    channel_id,
    id,
    title,
    t,
    setIsModalVisible,
    button,
  }) => {
    const onFinish = (values) => {
      contentController.addContent({ ...values, channel_id, id })
      setIsModalVisible(false)
    }

    console.log(contentController.response)

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
            <Button
              type="primary"
              htmlType="submit"
              loading={contentController.loading}
            >
              {button}
            </Button>
          </div>
        </Form>
      </Card>
    )
  },
)
