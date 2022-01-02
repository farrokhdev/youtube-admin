import React from 'react'
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

export const ModalOrderAccept = observer(
  ({ t, isModalVisible, setIsModalVisible, openModal, title, children }) => {
    const handleOk = () => {
      setIsModalVisible(false)
    }

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
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {children}
        </Modal>
      </div>
    )
  },
)
