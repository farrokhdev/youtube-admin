import React from "react";
import { observer } from "mobx-react";
import { DeleteOutlined } from "@ant-design/icons";
import {
  Card,
  List,
  Avatar,
  Form,
  Input,
  Radio,
  Button,
  Popconfirm,
} from "antd";

import Router from "next/router";

const grid = { gutter: [0, 20], xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 4 };
const { Meta } = Card;

export const Contents = observer(
  ({ contents, t, deleteHandler, pageNumber, pageSize, total, controller }) => {
    const showDetails = (id) => {
      Router.push(`/provider/content_single/${id}`);
    };

    // pop confirm
    const confirm = (id) => {
      deleteHandler(id);
    };

    const cancel = (e) => {
      console.log(e);
    };
    // pop confirm

    return (
      <div className="all_Contents">
        <List
          grid={grid}
          dataSource={contents}
          itemLayout="horizontal "
          size="large"
          locale={{
            emptyText: t("provider:allVideos.nodata"),
          }}
          pagination={
            contents.length && {
              onChange: (page) => {
                controller.getAllContents({
                  page: page,
                });
              },

              pageSize: pageSize,
              total: total,
              current: parseInt(pageNumber),
            }
          }
          renderItem={(item, indx) => (
            <List.Item key={indx}>
              <Card
                className="search_items"
                hoverable
                cover={<img alt="example" src={item && item.thumbnail} />}
                actions={[
                  <Button onClick={() => showDetails(item.id)}>
                    {t("provider:allVideos.details-btn")}
                  </Button>,
                  <Popconfirm
                    title={t("provider:allVideos.want_to_delete")}
                    onConfirm={() => confirm(item.id)}
                    onCancel={cancel}
                    okText={t("provider:allVideos.yes")}
                    cancelText={t("provider:allVideos.no")}
                  >
                    <DeleteOutlined key="ellipsis" />
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
      </div>
    );
  }
);
