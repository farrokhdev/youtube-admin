import React, { useState, useEffect } from 'react'
import { MainLayout } from 'extras/Layout/MainLayout'
import { Button, Card, Divider, message, Popconfirm, Tag } from 'antd'
import { ListTable } from 'extras/components/Table/ListTable'
import ChannelController from 'extras/controllers/ChannelController'
import { observer } from 'mobx-react'
import StateView from 'extras/components/StateView/StateView'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import Router from 'next/router'
import { ResponsiveTableList } from 'extras/components/Table/ResponsiveTableLIst'

const controller = new ChannelController()

const Channels = observer(() => {
  // switch to add channel
  const [addChannel, setAddChannel] = useState()
  // for translate
  const { t } = useTranslation()
  // getting list data
  useEffect(() => {
    controller.getAllChannels()
  }, [])

  const RouteHandler = () => {
    Router.push('/provider/add_channel')
  }
  const deleteHandler = (id) => {
    controller.deleteChannels({ channel_id: id }, () => {
      controller.getAllChannels()
    })
  }

  const updateHandler = (grade, id) => {
    Router.push(`/provider/channel_single/${id}`)
  }

  // pop confirm
  const confirm = (id, e) => {
    console.log(e)
    deleteHandler(id)
  }

  const cancel = (e) => {
    console.log(e)
  }
  // pop confirm

  const colorHandler = (e) => {
    if (e) {
      return 'green'
    } else {
      return 'orange'
    }
  }

  const columns = [
    {
      title: t('provider:tableList.id'),
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      align: 'center',
      responsive: ['md'],
    },
    {
      title: t('provider:tableList.title'),
      dataIndex: 'channel',
      key: 'channel',
      width: '30%',
      align: 'center',
      render: (ch, data) => (
        <div className="channel_item">
          <span>{data.title}</span>
        </div>
      ),
    },
    {
      title: t('provider:tableList.status'),
      dataIndex: 'is_activated',
      key: 'is_activated',

      width: '20%',
      align: 'center',

      render: (ch, data) =>
        data.is_activated ? (
          <Tag color={colorHandler(data.is_activated)}>
            {t('provider:channels.active')}
          </Tag>
        ) : (
          <Tag color={colorHandler(data.is_activated)}>
            {t('provider:channels.deactive')}
          </Tag>
        ),
    },
    {
      title: t('provider:tableList.created_at'),
      dataIndex: 'created_at',
      width: '20%',
      align: 'center',
      responsive: ['md'],
    },
    {
      title: t('provider:tableList.actions'),
      dataIndex: 'row',
      key: 'actions',
      width: '20%',
      align: 'center',
      render: (ch, data, i) => (
        <>
          <div className="actions">
            <Button
              className="edit"
              onClick={() => updateHandler(data.grade, data.id)}
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title={t('provider:channels.want_to_delete')}
              onConfirm={() => confirm(data.id)}
              onCancel={cancel}
              okText={t('provider:channels.yes')}
              cancelText={t('provider:channels.no')}
            >
              <Button className="delete">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </div>
        </>
      ),
    },
  ]

  const mobileColumn = (item) => [
    {
      item1: (
        <>
          <div className="item">
            <span className="_title">{t('provider:tableList.id')}</span>
            <span>{item.id}</span>
          </div>
          <Divider className="divider" />
        </>
      ),
    },
    {
      item2: (
        <>
          <div className="item">
            <span className="_title">{t('provider:tableList.title')}</span>
            <span>{item.title}</span>
          </div>
          <Divider className="divider" />
        </>
      ),
    },
    {
      item3: (
        <>
          <div className="item">
            <span className="_title">{t('provider:tableList.status')}</span>
            <span>
              {item.is_activated ? (
                <Tag color={colorHandler(item.is_activated)}>
                  {t('provider:channels.active')}
                </Tag>
              ) : (
                <Tag color={colorHandler(item.is_activated)}>
                  {t('provider:channels.deactive')}
                </Tag>
              )}
            </span>
          </div>
          <Divider className="divider" />
        </>
      ),
    },
    {
      item4: (
        <>
          <div className="item">
            <span className="_title">{t('provider:tableList.created_at')}</span>
            <span>{item.created_at}</span>
          </div>
          <Divider className="divider" />
        </>
      ),
    },
    {
      item5: (
        <div className="item">
          <span className="_title">{t('provider:tableList.details')}</span>
          <div className="actions">
            <Button
              className="edit"
              onClick={() => updateHandler(data.grade, data.id)}
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title={t('provider:channels.want_to_delete')}
              onConfirm={() => confirm(data.id)}
              onCancel={cancel}
              okText={t('provider:channels.yes')}
              cancelText={t('provider:channels.no')}
            >
              <Button className="delete">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </div>
        </div>
      ),
    },
  ]

  return (
    <MainLayout>
      <div className="main_sec">
        <div className="title-box">
          <h2>کانال ها</h2>
          <Button className="typic_btn" onClick={RouteHandler}>
            {t('provider:channels.add_new_channel')} <PlusOutlined />
          </Button>
        </div>
        <Divider className="dvider" />

        <StateView state={controller.stateview}>
          <ListTable
            columns={columns}
            list={controller.allChannels}
            controller={controller}
            loading={controller.loading}
          />

          <ResponsiveTableList
            list={controller.allChannels}
            deleteHandler={deleteHandler}
            confirm={confirm}
            cancel={cancel}
            updateHandler={updateHandler}
            mobileColumn={mobileColumn}
            title={t('provider:tableList.mobile.forChannels')}
          />
        </StateView>
      </div>
    </MainLayout>
  )
})

export default Channels
