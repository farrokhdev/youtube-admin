import React, { useState } from 'react'
import { Modal, Button, Divider, Form, Slider, Radio } from 'antd'
import CurrencyFormat from 'react-currency-format'

import { AudioOutlined, PlusOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react'
import { ContentUpdateForm } from '../Form/ContentUpdateForm'

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
)

export const ModalContentUpdate = observer(
  ({
    channelSingle,
    contentController,
    children,
    title,
    button,
    isModalVisible,
    setIsModalVisible,
    showModal,
    channel_id,
    content,
    t,
  }) => {
    const handleCancel = () => {
      setIsModalVisible(false)
    }

    const onChange = (value) => {
      contentController.contentDetails.setVal('price_ads', value)
    }

    // for update
    const initialValues = {
      price_ads: content && content.price_ads,
      is_activated: content && content.channel.is_activated,
    }

    console.log(content)

    return (
      <div className="open_modal">
        <Modal
          title={title}
          visible={isModalVisible}
          okText={'تایید'}
          cancelText="انصراف"
          okType="default"
          onOk={showModal}
          onCancel={handleCancel}
        >
          <ContentUpdateForm
            channel_id={channelSingle && channelSingle.id}
            content_id={content && content.id}
            t={t}
            initialValues={initialValues}
            controller={contentController}
          >
            <Form.Item name="price_ads" label={'بازه قیمتی'}>
              <Slider
                min={content && content.channel.price_from}
                max={content && content.channel.price_to}
                onChange={onChange}
              />
            </Form.Item>
            <div className="ant-form-item price">
              <CurrencyFormat
                value={contentController.contentDetails.price_ads}
                displayType={'text'}
                thousandSeparator={true}
                suffix={' ' + 'تومان'}
                renderText={(value) => <div>{value}</div>}
              />
            </div>

            <Form.Item
              name="is_activated"
              label={t('provider:detail_form.status')}
            >
              <Radio.Group>
                <Radio value={0}>{t('provider:detail_form.deactive')}</Radio>
                <Radio value={1}>{t('provider:detail_form.active')}</Radio>
              </Radio.Group>
            </Form.Item>
          </ContentUpdateForm>
        </Modal>
      </div>
    )
  },
)
