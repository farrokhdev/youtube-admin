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

const { Option } = Select

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
}
/* eslint-enable no-template-curly-in-string */

export const ContentUpdateForm = observer(
  ({
    children,
    controller,
    content_id,
    channel_id,
    t,
    title,
    setIsModalVisible,
    initialValues,
  }) => {
    const onFinish = (values) => {
      controller.updateTheContent({ ...values, content_id, channel_id })
      setIsModalVisible && setIsModalVisible(false)
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
          initialValues={initialValues}
        >
          <h2>{title}</h2>

          {children}

          <div className="btn_wrapper">
            <Button
              type="primary"
              htmlType="submit"
              loading={controller.loading}
            >
              {t('provider:detail_form.updateBtn')}
            </Button>
          </div>
        </Form>
      </Card>
    )
  },
)
