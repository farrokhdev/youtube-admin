import React, { useState } from "react";
import { Card, Avatar, Col, Row } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const gridStyle = {
  width: "100%",
  textAlign: "center",
};

export const ContentLists = ({ list }) => {
  return (
    <div className="site-card-wrapper">
      <Row className="content_row" gutter={{ xs: 8, sm: 16, md: 18, lg: 24 }}>
        {list.map((item) => {
          return (
            <Col span={6} key={item.id} className="content_box">
              <Card
                className="content_card"
                style={gridStyle}
                cover={
                  <img
                    alt="example"
                    src={item.contentImg}
                    className="content_img"
                  />
                }
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={item.title}
                  description={item.description}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
