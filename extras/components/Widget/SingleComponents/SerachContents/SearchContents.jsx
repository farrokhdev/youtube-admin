import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import Image from "next/image";

import {
  CaretRightOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, List, Card, Avatar } from "antd";
const grid = { gutter: [0, 20], xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 4 };
const { Meta } = Card;

export const SearchContents = observer(
  ({ controller, t, contents, openAddModal }) => {
    console.log(contents);

    return (
      <div className="search_Contents">
        <List
          loading={controller.loading}
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
                console.log(page);
                controller.page = page;
              },
              pageSize: 20,
              current: controller.page,
            }
          }
          renderItem={(item, indx) => (
            <List.Item>
              <Card
                key={indx}
                hoverable
                cover={<img alt="example" src={item.thumbnail} />}
                actions={[
                  <Button onClick={() => openAddModal(item)}>
                    {t("provider:addVideos.add-btn")}
                    <PlusOutlined key="edit" />
                  </Button>,
                ]}
              >
                {/* {console.log(item.id)} */}
                <Meta
                  avatar={<Avatar src={controller.channelSingle.thumbnail} />}
                  title={item.title}
                  description={
                    item.description && item.description.length > 60
                      ? item.description.slice(0, 10) + " . . ."
                      : item.description
                  }
                />
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
);
