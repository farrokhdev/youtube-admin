import React, { useState } from 'react'
import { Modal, Button, Divider } from 'antd'

import { AudioOutlined, PlusOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react'

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
)

export const ModalChannelAdd = observer(
  ({
    controller,
    children,
    title,
    button,
    isModalVisible,
    setIsModalVisible,
    showModal,

    t,
  }) => {
    const handleCancel = () => {
      setIsModalVisible(false)
    }

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
          {children}
        </Modal>
      </div>
    )
  },
)
