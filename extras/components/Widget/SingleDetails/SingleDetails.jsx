import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { observer } from 'mobx-react'
import { Card, Divider, Input, Form, Radio, Slider, Button } from 'antd'
// import { AllContents } from '../SingleComponents/AllContents/AllContents'
// import { OpenModal } from '../../Modals/channelsModal'
import { SearchContents } from '../SingleComponents/SerachContents/SearchContents'
import { Details } from '../Details/Details'
import StateView from 'extras/components/StateView/StateView'
import Router from 'next/router'
// import CalendarComp from 'extras/components/CalendarComp/CalendarComp'
// import ChannelModel from 'extras/models/classModels/ChannelModel'
import dynamic from 'next/dynamic'

const { Search } = Input

export const SingleDetails = observer(
  ({ t, data, controller, openUpdateChannelModal }) => {
    // const FullCalenderDynamic = dynamic(
    //   () => import('extras/components/CalendarComp/CalendarComp'),
    //   {
    //     ssr: false,
    //     loading: () => <p>...</p>,
    //   },
    // )
    // modal
    const [price, setPrice] = useState()

    console.log(controller.allSearchContents)

    const onSearch = (value) => {
      console.log(value)
      controller.setPage(1)
      controller.getChannelContent({
        channelId: controller.channelSingle.channelId,
        search: value,
      })
    }

    console.log(data)

    // change route
    const RouteHandler = () => {
      Router.push(
        `/provider/channel_single/${data.channelId}/${data.id}/add_content`,
      )
    }

    console.log(price)

    const onChange = (value) => {
      setPrice(value[1])
    }

    return (
      <>
        <div className="details_channel">
          <div className="channel_thumbnail">
            <Image
              className="channel_pic"
              width="50px"
              height="50px"
              src={'/logo.png'}
              alt="channel img"
            />
            <div className="channel_title">
              <h2>{data.title}</h2>
              <span>
                {t('provider:channelSingle.sub_cont')} {data.subscriber_count}
              </span>
            </div>
            <Button className="typic_btn" onClick={openUpdateChannelModal}>
              {t('provider:channelSingle.update_channel')}
            </Button>
            <Button className="typic_btn" onClick={RouteHandler}>
              {t('provider:channelSingle.search-channel-content')}
            </Button>
          </div>
          <div className="category">
            <span>{t('provider:channelSingle.category')}</span>
            <span>{data.category.title}</span>
          </div>
          <div className="view_details">
            <div className="detailbox">
              <div className="details">
                <span>{t('provider:channelSingle.video_count')}</span>

                <span>{data.video_count}</span>
              </div>
              <div className="details">
                <span>{t('provider:channelSingle.view_count')}</span>

                <span>{data.view_count}</span>
              </div>
              <div className="details">
                <span>{t('provider:channelSingle.sub_cont')}</span>

                <span>{data.subscriber_count}</span>
              </div>
              <div className="details">
                <span>{t('provider:channelSingle.release_date')}</span>

                <span className="count">{data.published_at}</span>
              </div>
              <div className="details">
                <span>{t('provider:channelSingle.created_at')}</span>
                <span>{data.created_at}</span>
              </div>
            </div>

            <div className="calender">
              {/* <FullCalenderDynamic
                controller={orderController}
                list={orderController.eventList}
              /> */}
            </div>
            <div className="channel_desc">{data.description}</div>
          </div>
        </div>
      </>
    )
  },
)
