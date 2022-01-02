import React, { useState, useEffect } from 'react'
import { MainLayout } from 'extras/Layout/MainLayout'
import { observer } from 'mobx-react'
import { TicketForm } from 'extras/components/Form/TicketForm/TicketForm'
import TicketController from 'extras/controllers/TicketController'
import { Form, Upload, Button, Input, Row, Col, Divider, Select } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import Router from 'next/router'
import { useTranslation } from 'react-i18next'

// const { Input } = Form;
const ticketController = new TicketController()

const addTicket = observer(() => {
  const { t } = useTranslation()

  const normFile = (e) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const handleUpload = (file) => {
    let fromData = new FormData()
    fromData.append('file', file)

    ticketController.uploadTicket(fromData)
  }

  const toTickets = () => {
    Router.push('/provider/tickets')
  }

  return (
    <MainLayout>
      <div className="main_sec">
        <div className="title-box">
          <h2>ارسال تیکت</h2>
        </div>
        <Divider className="divider" />
        <TicketForm controller={ticketController} t={t}>
          <Form.Item
            // className="ticket_item"
            label={t('provider:tableList.title')}
            name="subject"
            rules={[
              {
                required: true,
                message: t('provider:tickets.fill_ticket_title'),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            // className="ticket_item"
            label={t('provider:tableList.department')}
            name="department"
            rules={[
              {
                required: true,
                message: t('provider:tickets.fill_department'),
              },
            ]}
          >
            <Select>
              <Select.Option value="technical">technical</Select.Option>
              <Select.Option value="financial">financial</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            className="ticket_item"
            // labelCol={{ span: 0, offset: 0 }}
            wrapperCol={{ span: 13, offset: 0 }}
            label={t('provider:tableList.description')}
            name="message"
            rules={[
              {
                required: true,
                message: t('provider:tickets.fill_description'),
              },
            ]}
          >
            <Input.TextArea className="ticket_textarea" />
          </Form.Item>
          <Form.Item
            className="ticket_item"
            label={t('provider:tickets.send_file')}
            name="attache"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action={handleUpload} listType="picture">
              <Button block icon={<UploadOutlined />}>
                {t('provider:tickets.upload')}
              </Button>
            </Upload>
          </Form.Item>
        </TicketForm>
      </div>
    </MainLayout>
  )
})

export default addTicket
