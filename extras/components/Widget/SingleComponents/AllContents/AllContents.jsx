import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import {
  Card,
  List,
  Avatar,
  Form,
  Input,
  Radio,
  Popconfirm,
  Button,
} from 'antd'
import { MainController } from 'extras/controllers/MainController'
// import { OpenModal } from '../../../Modals/channelsModal'

const grid = { gutter: [0, 20], xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 4 }
const { Meta } = Card

export const AllContents = observer(
  ({
    contents,
    t,
    openContent,
    deleteHandler,
    pageNumber,
    pageSize,
    total,
    controller,
    channel_id,
  }) => {
    console.log(pageNumber)

    // pop confirm
    const confirm = (id, e) => {
      console.log(e)
      deleteHandler(id)
    }

    const cancel = (e) => {
      console.log(e)
    }
    // pop confirm

    return (
      <>
        <List
          // loading={loading}
          grid={grid}
          dataSource={contents}
          itemLayout="horizontal "
          size="large"
          locale={{
            emptyText: 'هیچ محتوایی وجود ندارد',
          }}
          pagination={
            contents.length && {
              onChange: (page) => {
                controller.getAllContents({
                  channel_id: channel_id,
                  page: page,
                })
              },

              pageSize: pageSize,
              total: total,
              current: parseInt(pageNumber),
            }
          }
          renderItem={(item, indx) => (
            <List.Item key={indx}>
              {console.log(item.id)}
              <Card
                className="search_items"
                hoverable
                // style={{ width: 240 }}
                cover={<img alt="example" src={item.thumbnail} />}
                actions={[
                  <Button key="edit" onClick={() => openContent(item.id)}>
                    جزییات
                  </Button>,
                  <Popconfirm
                    key="ellipsis"
                    title="آیا مایل هستید این محتوا را پاک کنید؟"
                    onConfirm={() => confirm(item.id)}
                    onCancel={cancel}
                    okText="بله"
                    cancelText="خیر"
                  >
                    <DeleteOutlined />
                  </Popconfirm>,
                ]}
              >
                <Meta
                  avatar={<Avatar src={item.thumbnail} />}
                  title={item.title}
                  description={item.description}
                />
              </Card>
            </List.Item>
          )}
        />
      </>
    )
  },
)
