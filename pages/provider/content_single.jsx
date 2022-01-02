import React, { useEffect, useState } from 'react'
import ChannelController from 'extras/controllers/ChannelController'
import { observer } from 'mobx-react'
import StateView from 'extras/components/StateView/StateView'
import { MainLayout } from 'extras/Layout/MainLayout'
import ContentController from 'extras/controllers/ContentController'
import { SingleDetails } from 'extras/components/Widget/SingleDetails/SingleDetails'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Form, Select, Radio, Slider, Button, Divider } from 'antd'
import Router from 'next/router'
import Link from 'next/link'
import { ContentUpdateForm } from 'extras/components/Form/ContentUpdateForm'
import CurrencyFormat from 'react-currency-format'
import { DeleteOutlined } from '@ant-design/icons'

const { Option } = Select

const contentController = new ContentController()
const controller = new ChannelController()

const content_single = observer(() => {
  const { t } = useTranslation()
  const [add, setAdd] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const router = useRouter()

  useEffect(() => {
    contentController.viewContent({ content_id: router.query.id }, () => {
      controller.getCategories()
    })
  }, [])

  const openUpdateModal = () => {
    setIsModalVisible(true)
  }

  // handling delete content
  const deleteHandler = (itemId) => {
    contentController.deleteContent({ content_id: itemId })
    Router.push('/provider/channels/')
  }

  const RouteHandler = () => {
    window.history.back()
    // Router.push('/provider/contents')
  }

  const onChange = (value) => {
    contentController.contentDetails.setVal('price_ads', value)
  }

  console.log(contentController.contentDetails)
  // for update
  const initialValues = {
    price_ads: contentController.contentDetails.price_ads,
    is_activated: contentController.contentDetails.is_activated,
  }

  const marks = {
    0: {
      label: contentController.contentDetails.channel.grade.price_from,
      number: parseInt(
        contentController.contentDetails.channel.grade.price_from,
      ),
    },
    100: {
      label: contentController.contentDetails.channel.grade.price_to,
      number: parseInt(contentController.contentDetails.channel.grade.price_to),
    },
  }

  return (
    <StateView state={contentController.stateview}>
      <MainLayout>
        <div className="main_sec">
          <div className="title-box">
            <h2>{t('provider:videoSingle.title')}</h2>
            <Button className="typic_btn" onClick={RouteHandler}>
              {t('provider:videoSingle.button')}
            </Button>
          </div>
          <Divider className="dvider" />

          <div className="content_details">
            <div className="content_title">
              <h2>{contentController.contentDetails.title}</h2>
              <Button
                className="delete"
                icon={<DeleteOutlined />}
                onClick={() => {
                  deleteHandler(contentController.contentDetails.id)
                }}
              >
                {t('provider:videoSingle.delete')}
              </Button>
            </div>
            <div className="content_info">
              <img src={contentController.contentDetails.thumbnail} alt="" />
            </div>
            <div className="content_update_form">
              <h4>{t('provider:videoSingle.update-video')}</h4>
              <ContentUpdateForm
                channel_id={contentController.contentDetails.channel.id}
                controller={contentController}
                initialValues={initialValues}
                t={t}
                content_id={contentController.contentDetails.id}
              >
                <Form.Item
                  name="price_ads"
                  label={t('provider:videoSingle.price')}
                >
                  <Slider
                    // marks={marks}
                    min={
                      contentController.contentDetails.channel.grade.price_from
                    }
                    max={
                      contentController.contentDetails.channel.grade.price_to
                    }
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
                  label={t('provider:videoSingle.state')}
                >
                  <Radio.Group>
                    <Radio value={0}>
                      {t('provider:videoSingle.deactive')}
                    </Radio>
                    <Radio value={1}>{t('provider:videoSingle.active')}</Radio>
                  </Radio.Group>
                </Form.Item>
              </ContentUpdateForm>
            </div>
            <div className="content_items">
              <h4>{t('provider:videoSingle.video-data')}</h4>
              <div className="content_item">
                <span>{t('provider:videoSingle.view-count')}</span>
                <span>{contentController.contentDetails.view_count}</span>
              </div>
              <div className="content_item">
                <span>{t('provider:videoSingle.duration')}</span>
                <span>{contentController.contentDetails.duration}</span>
              </div>
              <div className="content_item">
                <span>{t('provider:videoSingle.likes')}</span>
                <span>{contentController.contentDetails.like_count}</span>
              </div>
              <div className="content_item">
                <span>{t('provider:videoSingle.dislikes')}</span>
                <span>{contentController.contentDetails.dislike_count}</span>
              </div>
              <div className="content_item">
                <span>{t('provider:videoSingle.upload-date')}</span>
                <span>{contentController.contentDetails.published_at}</span>
              </div>

              <div className="content_item"></div>
            </div>
            <div className="channel_details">
              <h4>{t('provider:videoSingle.channel')}</h4>
              <img
                className="thumb"
                src={contentController.contentDetails.channel.thumbnail}
                alt=""
              />
              <Link
                href={`/provider/channel_single/${contentController.contentDetails.channel.id}`}
              >
                {contentController.contentDetails.channel.title}
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    </StateView>
  )
})

export default content_single
