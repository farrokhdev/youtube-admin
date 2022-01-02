import React, { useEffect } from 'react'
import Image from 'next/image'
import { observer } from 'mobx-react'
import { Card, Form, Radio, Slider, Select } from 'antd'
import { ChannelAddForm } from 'extras/components/Form/ChannelAddForm'
import StateView from 'extras/components/StateView/StateView'

const { Option } = Select

export const Details = observer(({ controller, data, categories, type, t }) => {
  return (
    <>
      <div className="details" dir="rtl">
        <div className="details_wrapper">
          <Card className="details_content">
            <div className="channel_thumbnail">
              {type !== 'content' && (
                <Image
                  className="channel_pic"
                  width="50px"
                  height="50px"
                  src={'/logo.png'}
                  // src={data.thumbnail}
                  alt="channel img"
                />
              )}
              <div className="channel_title">
                <h2>{data.title}</h2>
                <span>
                  {t('provider:addChannel.subscriberes')}
                  {data.subscriber_count}
                </span>
              </div>
            </div>

            <div className="channel_desc">
              {data.description && data.description.length > 200
                ? data.description.slice(0, 120) + ' . . .'
                : data.description}
            </div>
          </Card>

          <ChannelAddForm
            controller={controller}
            t={t}
            channelId={data.channelId}
            button={t('provider:addChannel.form-btn')}
          >
            <Form.Item
              name="category_id"
              label={t('provider:addChannel.category')}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: t('provider:channels.category_alert'),
                },
              ]}
            >
              <Select
                placeholder={t('provider:addChannel.category-placeholder')}
              >
                {categories.map((item) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.title}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>

            <Form.Item
              name="is_activated"
              label={t('provider:addChannel.state')}
            >
              <Radio.Group>
                <Radio value="0">{t('provider:addChannel.deactive')}</Radio>
                <Radio value="1">{t('provider:addChannel.active')}</Radio>
              </Radio.Group>
            </Form.Item>
          </ChannelAddForm>
        </div>
      </div>
    </>
  )
})
