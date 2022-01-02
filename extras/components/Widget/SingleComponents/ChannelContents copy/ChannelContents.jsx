import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { PlusOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { Button, Modal } from 'antd'
import { MainController } from 'extras/controllers/MainController'
import { DetailContentForm } from 'extras/components/Form/DetailContentForm/DetailContentForm'

export const ChannelContents = observer(
  ({ data, controller, contentController, channel_id }) => {
    // const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = (i, status) => {
      // setIsModalVisible(true)
      controller.openModal(i, status)
    }
    const handleOk = () => {
      // setIsModalVisible(false)
    }

    const handleCancel = () => {
      // setIsModalVisible(false)
    }

    return (
      <div className="search_content_details">
        {data.length &&
          data.map((content, i) => {
            console.log(content.modal)
            return (
              <div className="content_item" key={content.id}>
                <Image
                  src="/logo.png"
                  // src={content.thumbnail}
                  objectFit="contain"
                  objectPosition="center"
                  width="100%"
                  height="120px"
                  className="content_img"
                />
                {/* <p className="content_desc">{content.description}</p> */}

                <div className="cont_title_box">
                  <Image
                    src="/logo.png"
                    // src={data.thumbnail}
                    objectFit
                    width="50px"
                    height="50px"
                    className="channel_img"
                  />
                  <div className="title">{content.title}</div>
                </div>
                <div className="actions">
                  <Button
                    className="add"
                    type="primary"
                    onClick={() => showModal(i, true)}
                  >
                    <PlusOutlined />
                  </Button>
                </div>
                <Modal
                  title="Basic Modal"
                  visible={content.modal}
                  onOk={handleOk}
                  onCancel={() => showModal(i, false)}
                >
                  <DetailContentForm
                    channel_id={channel_id}
                    id={content.id}
                    contentController={contentController}
                  />
                </Modal>
              </div>
            )
          })}
      </div>
    )
  },
)
