import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { observer } from 'mobx-react'
import { Card, Form, Radio, Slider, Select } from 'antd'
import { ContentAddForm } from 'extras/components/Form/ContentAddForm'
import CurrencyFormat from 'react-currency-format'

const { Option } = Select

export const ContentDetails = observer(
  ({
    controller,
    contentController,
    data,
    channel_id,
    t,
    price_from,
    price_to,
    setIsModalVisible,
  }) => {
    const [price, setPrice] = useState(0)

    const marks = {
      0: {
        style: {
          color: '#4285f4',
        },
        label: <strong>{price_from}</strong>,
      },

      100: {
        style: {
          color: '#4285f4',
        },
        label: <strong>{price_to}</strong>,
      },
    }

    const onChange = (value) => {
      setPrice(value)
    }

    return (
      <>
        <div className="details" dir="rtl">
          <div className="details_wrapper">
            <Card className="details_content">
              <div className="channel_thumbnail">
                <Image
                  className="channel_pic"
                  width="50px"
                  height="50px"
                  src={'/logo.png'}
                  // src={data.thumbnail}
                  alt="channel img"
                />

                <div className="channel_title">
                  <h2>{data.title}</h2>
                </div>
              </div>

              <div className="channel_desc">
                {data.description && data.description.length > 200
                  ? data.description.slice(0, 120) + ' . . .'
                  : data.description}
              </div>
            </Card>
            <ContentAddForm
              controller={controller}
              contentController={contentController}
              t={t}
              channel_id={channel_id}
              id={data.id}
              setIsModalVisible={setIsModalVisible}
              button={t('provider:addVideos.form-btn')}
            >
              <Form.Item
                name="price_ads"
                label={t('provider:addVideos.price')}
                initialValue={0}
              >
                <Slider min={price_from} max={price_to} onChange={onChange} />
              </Form.Item>
              <div className="ant-form-item price">
                <CurrencyFormat
                  value={price}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={' ' + 'تومان'}
                  renderText={(value) => <div>{value}</div>}
                />
              </div>
              <Form.Item
                name="is_activated"
                label={t('provider:addVideos.state')}
              >
                <Radio.Group>
                  <Radio value="0">{t('provider:addVideos.deactive')}</Radio>
                  <Radio value="1">{t('provider:addVideos.active')}</Radio>
                </Radio.Group>
              </Form.Item>
            </ContentAddForm>
          </div>
        </div>
      </>
    )
  },
)
