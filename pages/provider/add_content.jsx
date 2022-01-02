import React, { useEffect, useState } from 'react'
import {
  Form,
  Select,
  Radio,
  Slider,
  Input,
  List,
  Card,
  Divider,
  Button,
} from 'antd'
import Router from 'next/router'
import { observer } from 'mobx-react'
import { MainLayout } from 'extras/Layout/MainLayout'
import { SearchContents } from 'extras/components/Widget/SingleComponents/SerachContents/SearchContents'
import ChannelController from 'extras/controllers/ChannelController'
import { useTranslation } from 'react-i18next'
import { SingleDetails } from 'extras/components/Widget/SingleDetails/SingleDetails'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ModalContentAdd } from 'extras/components/Modals/ModalContentAdd'
import { Details } from 'extras/components/Widget/Details/Details'
import { ContentDetails } from 'extras/components/Widget/Details/ContentDetails'
import ContentController from 'extras/controllers/ContentController'
import StateView from 'extras/components/StateView/StateView'

const { Search } = Input
const { Option } = Select

const controller = new ChannelController()

const contentController = new ContentController()

const add_content = observer(() => {
  const { t } = useTranslation()

  const router = useRouter()

  const [contentItem, setContentItem] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    controller.showChannelDetails({ channel_id: router.query.channel_id })
  }, [])

  useEffect(() => {
    controller.getChannelContent({ channelId: router.query.id })
  }, [])

  const RouteHandler = () => {
    Router.push('/provider/channels')
  }

  const openAddModal = (content) => {
    setContentItem(content)
    setIsModalVisible(true)
  }

  const onSearch = (value) => {
    controller.getChannelContent({ channelId: router.query.id, search: value })
  }

  return (
    <MainLayout>
      {/* content add modal  */}

      <ModalContentAdd
        showModal={openAddModal}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        t={t}
      >
        <StateView state={controller.stateview}>
          <ContentDetails
            controller={controller}
            channel_id={router.query.channel_id}
            data={contentItem}
            t={t}
            price_from={controller.channelSingle.price_from}
            price_to={controller.channelSingle.price_to}
            contentController={contentController}
            setIsModalVisible={setIsModalVisible}
          />
        </StateView>
      </ModalContentAdd>

      <div className="main_sec">
        <div className="title-box">
          <h2>{t('provider:addVideos.title')}</h2>
          <Button className="typic_btn" onClick={RouteHandler}>
            {t('provider:addVideos.button')}
          </Button>
        </div>
        <Divider className="dvider" />
        <Card bordered={false} className="details_channel">
          <div className="channel_thumbnail">
            <Image
              className="channel_pic"
              width="50px"
              height="50px"
              src={'/logo.png'}
              alt="channel img"
            />
            <div className="channel_title">
              <h2>{controller.channelSingle.title}</h2>
              <span>
                {t('provider:addVideos.subscribers')}
                {controller.channelSingle.subscriber_count}
              </span>
            </div>
          </div>
        </Card>
        <div className="search_box">
          <Search
            className="search_bar"
            loading={controller.loading}
            placeholder={t('provider:addVideos.search-placeholder')}
            onSearch={onSearch}
            enterButton
          />
        </div>

        <StateView state={controller.stateview}>
          <SearchContents
            openAddModal={openAddModal}
            controller={controller}
            t={t}
            contents={controller.allSearchContents}
          />
        </StateView>
      </div>
    </MainLayout>
  )
})

export default add_content
