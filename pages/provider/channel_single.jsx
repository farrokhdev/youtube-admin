import React, { useEffect, useState } from 'react'
import ChannelController from 'extras/controllers/ChannelController'
import { observer } from 'mobx-react'
import StateView from 'extras/components/StateView/StateView'
import { MainLayout } from 'extras/Layout/MainLayout'
import ContentController from 'extras/controllers/ContentController'
import OrderController from 'extras/controllers/OrderController'
import { SingleDetails } from 'extras/components/Widget/SingleDetails/SingleDetails'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Form, Select, Radio, Slider, Button, Divider } from 'antd'
import { ModalChannelUpdate } from 'extras/components/Modals/ModalChannelUpdate'
import { ChannelUpdateForm } from 'extras/components/Form/ChannelUpdateForm'
import { AllContents } from 'extras/components/Widget/SingleComponents/AllContents/AllContents'
import Router from 'next/router'
import { ModalContentUpdate } from 'extras/components/Modals/ModalContentUpdate'
import { ContentUpdateForm } from 'extras/components/Form/ContentUpdateForm'
import CurrencyFormat from 'react-currency-format'

const { Option } = Select

const controller = new ChannelController()
const contentController = new ContentController()
const orderController = new OrderController()

const channel_single = observer(() => {
  const { t } = useTranslation()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isChannelModal, setIsChannelModal] = useState(false)
  const [content, setContent] = useState()

  const router = useRouter()

  // requests
  useEffect(() => {
    controller.showChannelDetails({ channel_id: router.query.id })
  }, [])
  useEffect(() => {
    controller.getCategories()
  }, [])

  useEffect(() => {
    orderController.getEvents({ channel_id: controller.channelSingle.id })
  }, [])

  useEffect(() => {
    contentController.getAllContents({ channel_id: router.query.id, page: 1 })
  }, [])

  const { channelSingle } = controller
  const { channel_id } = channelSingle.id

  const { categories } = controller

  // show modal
  const openUpdateChannelModal = () => {
    setIsChannelModal(true)
  }

  const openContent = (id) => {
    Router.push(`/provider/content_single/${id}`)
  }
  // show modal

  // handling delete content
  const deleteHandler = (itemId) => {
    contentController.deleteContent({ content_id: itemId }, () => {
      contentController.getAllContents({ channel_id: router.query.id, page: 1 })
    })
  }

  // for update
  const initialValues = {
    price_ads: contentController.contentDetails.price_ads,
    is_activated: contentController.contentDetails.is_activated,
  }

  // routes
  const RouteHandler = () => {
    Router.push('/provider/channels')
  }
  const RouteHandler2 = () => {
    Router.push('/provider/contents')
  }
  // routes

  return (
    <MainLayout>
      <ModalChannelUpdate
        showModal={openUpdateChannelModal}
        isModalVisible={isChannelModal}
        setIsModalVisible={setIsChannelModal}
        t={t}
        categories={categories}
        controller={controller}
        channel_id={channel_id}
        channelSingle={channelSingle}
      />

      <div className="main_sec">
        <div className="title-box">
          <h2>{t('provider:channelSingle.title')}</h2>
          <Button className="typic_btn" onClick={RouteHandler}>
            {t('provider:channelSingle.button')}
          </Button>
        </div>

        <Divider className="dvider" />

        <StateView state={controller.stateview}>
          <SingleDetails
            openUpdateChannelModal={openUpdateChannelModal}
            t={t}
            data={channelSingle}
            controller={controller}
            contentController={contentController}
            orderController={orderController}
          />
        </StateView>

        <div className="title-box">
          <h2>{t('provider:channelSingle.channel-videos')}</h2>
        </div>
        <Divider className="dvider" />

        <StateView state={contentController.stateview}>
          <AllContents
            openContent={openContent}
            contents={contentController.allContents}
            deleteHandler={deleteHandler}
            pageNumber={contentController.pageNumber}
            pageSize={contentController.pageSize}
            total={contentController.totalContent}
            controller={contentController}
            channel_id={channelSingle.id}
          />
        </StateView>
      </div>
    </MainLayout>
  )
})

export default channel_single
