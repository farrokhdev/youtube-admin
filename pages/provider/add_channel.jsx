import React, { useEffect, useState } from 'react'
import ChannelController from 'extras/controllers/ChannelController'
import { observer } from 'mobx-react'
import StateView from 'extras/components/StateView/StateView'
import { MainLayout } from 'extras/Layout/MainLayout'
import { useTranslation } from 'react-i18next'
import { ModalChannelAdd } from 'extras/components/Modals/ModalChannelAdd'
import { ChannelItem } from 'extras/components/Widget/ChannelItem/ChannelItem'
import Router from 'next/router'

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
import { Details } from 'extras/components/Widget/Details/Details'

const { Search } = Input
const { Option } = Select

const controller = new ChannelController()

const AddChannel = observer(() => {
  // modal
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = (channelId, indx) => {
    setIsModalVisible(true)
    controller.getChannelDetails(indx, { channelId }, () => {
      controller.onsuccessModal()
    })
  }

  const { t } = useTranslation()

  const onSearch = (value) => {
    controller.getSearchChannel({ search: value })
  }
  const RouteHandler = () => {
    Router.push('/provider/channels')
  }

  return (
    <>
      <ModalChannelAdd
        showModal={showModal}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        t={t}
      >
        <StateView state={controller.stateview}>
          <Details
            controller={controller}
            data={controller.channelSingle}
            categories={controller.categorieListAll}
            t={t}
          />
        </StateView>
      </ModalChannelAdd>

      <MainLayout>
        <div className="main_sec">
          <div className="title-box">
            <h2>{t('provider:addChannel.title')}</h2>
            <Button className="typic_btn" onClick={RouteHandler}>
              {t('provider:addChannel.button')}
            </Button>
          </div>
          <Divider className="dvider" />
          <div className="search_box">
            <Search
              className="search_bar"
              loading={controller.loading}
              placeholder={t('provider:addChannel.search-placeholder')}
              onSearch={onSearch}
              enterButton
            />
          </div>

          <List
            itemLayout="horizontal"
            dataSource={controller.searchchannelList}
            locale={{
              emptyText: t('provider:addChannel.nodata'),
            }}
            pagination={
              controller.searchchannelList.length && {
                onChange: (page) => {
                  console.log(page)
                },
                pageSize: 10,
              }
            }
            renderItem={(item, indx) => (
              <ChannelItem
                key={item.channelId}
                channelId={item.channelId}
                data={item}
                loading={controller.loading}
                showModal={showModal}
                t={t}
                indx={indx}
              />
            )}
          />
        </div>
      </MainLayout>
    </>
  )
})

export default AddChannel
