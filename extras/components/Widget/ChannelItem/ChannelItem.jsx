import React, { useState } from 'react'
import { Popconfirm, Button, List, Avatar } from 'antd'
import { observer } from 'mobx-react'
import { PlusOutlined } from '@ant-design/icons'

export const ChannelItem = observer(
  ({ channelId, data, t, showModal, loading, indx }) => {
    const [visible, setVisible] = React.useState(false)
    const [confirmLoading, setConfirmLoading] = React.useState(false)

    const handleOk = (channelId, indx) => {
      showModal(channelId, indx)
    }

    const handleCancel = () => {
      setVisible(false)
    }

    console.log(data)

    return (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={data.thumbnail} />}
          title={<a href="https://ant.design">{data.title}</a>}
          description={data.description}
        />
        <div>
          <Button
            loading={data.loading}
            className="typic_btn"
            onClick={() => handleOk(data.channelId, indx)}
          >
            {t('provider:addChannel.add-btn')} <PlusOutlined />
          </Button>
        </div>
      </List.Item>
    )
  },
)
