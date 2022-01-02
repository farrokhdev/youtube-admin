import React, { useState } from 'react'
import { Form, Input, InputNumber, Button, Select, Radio, Card } from 'antd'
import { observer } from 'mobx-react'
import { Router } from 'next/router'

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

export const ChannelAddForm = observer(
  ({ children, controller, channelId, title, t, button }) => {
    const onFinish = (values) => {
      controller.addChannel({ ...values, channelId })
    }

    return (
      <Card className="detail_form">
        <Form
          {...formItemLayout}
          name="nest-messages"
          onFinish={onFinish}
          layout="vertical"
          className="detail_form"
        >
          {/* <h2>{title}</h2> */}

          {/* form items  */}
          {children}
          {/* form items  */}
          <div className="btn_wrapper">
            <Button
              type="primary"
              htmlType="submit"
              loading={controller.loading}
            >
              {button}
            </Button>
          </div>
        </Form>
      </Card>
    )
  },
)
