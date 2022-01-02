import React, { useEffect, useState } from "react";
import {
  Form,
  Select,
  Radio,
  Slider,
  Input,
  List,
  Card,
  Divider,
  Button,
} from "antd";
import Router from "next/router";
import { observer } from "mobx-react";
import { MainLayout } from "extras/Layout/MainLayout";
import { SearchContents } from "extras/components/Widget/SingleComponents/SerachContents/SearchContents";
import ChannelController from "extras/controllers/ChannelController";
import { useTranslation } from "react-i18next";
import { SingleDetails } from "extras/components/Widget/SingleDetails/SingleDetails";
import Image from "next/image";
import { useRouter } from "next/router";
import { ModalContentAdd } from "extras/components/Modals/ModalContentAdd";
import { Details } from "extras/components/Widget/Details/Details";
import { ContentDetails } from "extras/components/Widget/Details/ContentDetails";
import ContentController from "extras/controllers/ContentController";
import StateView from "extras/components/StateView/StateView";
import { Contents } from "extras/components/Widget/SingleComponents/Contents/Contents";

const { Search } = Input;
const { Option } = Select;

const controller = new ChannelController();

const contentController = new ContentController();

const allcontents = observer(() => {
  const { t } = useTranslation();

  const router = useRouter();

  const [contentItem, setContentItem] = useState();
  const [isModalVisible, setIsModalVisible] = useState();

  useEffect(() => {
    contentController.getAllContents();
  }, []);

  const openAddModal = (content) => {
    console.log(content);
    setContentItem(content);
    setIsModalVisible(true);
  };

  const deleteHandler = (itemId) => {
    contentController.deleteContent({ content_id: itemId }, () => {
      contentController.getAllContents();
    });
    // contentController.allContents.shift()
  };

  const onSearch = (value) => {
    contentController.getAllContents({ search: value });
  };

  return (
    <MainLayout>
      {/* content add modal  */}

      <ModalContentAdd
        showModal={openAddModal}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        t={t}
      >
        {/* <StateView state={controller.stateview}> */}
        <ContentDetails
          controller={controller}
          channel_id={router.query.channel_id}
          data={contentItem}
          t={t}
          price_from={controller.channelSingle.price_from}
          price_to={controller.channelSingle.price_to}
          contentController={contentController}
        />
        {/* </StateView> */}
      </ModalContentAdd>

      <div className="main_sec">
        <div className="title-box">
          <h2>{t("provider:allVideos.title")}</h2>
        </div>
        <Divider className="dvider" />
        <div className="search_box">
          <Search
            className="search_bar"
            loading={controller.loading}
            placeholder={t("provider:allVideos.search-placeholder")}
            onSearch={onSearch}
            enterButton
          />
        </div>

        <StateView state={contentController.stateview}>
          <Contents
            contents={contentController.allContents}
            deleteHandler={deleteHandler}
            pageNumber={contentController.pageNumber}
            pageSize={contentController.pageSize}
            total={contentController.totalContent}
            controller={contentController}
            t={t}
          />
        </StateView>
      </div>
    </MainLayout>
  );
});

export default allcontents;
