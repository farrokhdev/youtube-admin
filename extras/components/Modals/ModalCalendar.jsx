import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'
import { observer } from 'mobx-react'

export const ModalCalendar = observer(
  ({
    controller,
    children,
    title,
    isModalVisible,
    setIsModalVisible,
    showModal,

    t,
  }) => {
    const handleCancel = () => {
      setIsModalVisible(false)
    }

    return (
      <div className="calendar_modal">
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
