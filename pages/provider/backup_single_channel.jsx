import React, { useEffect, useState } from "react";
import ChannelController from "extras/controllers/ChannelController";
import { observer } from "mobx-react";
import StateView from "extras/components/StateView/StateView";
import { MainLayout } from "extras/Layout/MainLayout";
import ContentController from "extras/controllers/ContentController";
import OrderController from "extras/controllers/OrderController";
import { SingleDetails } from "extras/components/Widget/SingleDetails/SingleDetails";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Form, Select, Radio, Slider, Button, Divider } from "antd";
import { ModalChannelUpdate } from "extras/components/Modals/ModalChannelUpdate";
import { ChannelUpdateForm } from "extras/components/Form/ChannelUpdateForm";
import { AllContents } from "extras/components/Widget/SingleComponents/AllContents/AllContents";
import Router from "next/router";
import { ModalContentUpdate } from "extras/components/Modals/ModalContentUpdate";
import { ContentUpdateForm } from "extras/components/Form/ContentUpdateForm";
import CurrencyFormat from "react-currency-format";

const { Option } = Select;

const controller = new ChannelController();
const contentController = new ContentController();
const orderController = new OrderController();

const channel_single = observer(() => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChannelModal, setIsChannelModal] = useState(false);
  const [contentId, setContentId] = useState();

  const router = useRouter();

  // requests
  useEffect(() => {
    controller.showChannelDetails({ channel_id: router.query.id });
  }, []);

  // useEffect(() => {
  //   orderController.getEvents({ channel_id: controller.channelSingle.id })
  // }, [])
  // requests

  const { contentsList, channelSingle } = controller;
  const { channel_id } = channelSingle.id;
  const { channelId } = controller.channelSingle;
  const categories = controller.categories;

  // variables

  // show modal
  const openUpdateChannelModal = () => {
    setIsChannelModal(true);
  };

  const openContentModal = (id) => {
    // setContentId(id)
    setIsModalVisible(true);
  };
  // show modal

  // handling delete content
  const deleteHandler = (itemId) => {
    contentController.deleteContent({ content_id: itemId }, () => {
      contentController.getAllContents({ channelId: channelId });
    });
  };

  // routes
  const RouteHandler = () => {
    Router.push("/provider/channels");
  };
  const RouteHandler2 = () => {
    Router.push("/provider/contents");
  };
  // routes

  return (
    <MainLayout>
      {/* update modal  */}
      {/* <ModalChannelUpdate
          showModal={openUpdateChannelModal}
          isModalVisible={isChannelModal}
          setIsModalVisible={setIsChannelModal}
          t={t}
        >
          <StateView state={controller.stateview}>
            <ChannelUpdateForm
              t={t}
              channel_id={channel_id}
              controller={controller}
            >
              <Form.Item
                name="category_id"
                label={t('provider:detail_form.category')}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: t('provider:detail_form.category_alert'),
                  },
                ]}
              >
                <Select placeholder={t('provider:detail_form.category_place')}>
                  {categories.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.title}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="is_activated"
                label={t('provider:detail_form.status')}
              >
                <Radio.Group>
                  <Radio value="0">{t('provider:detail_form.deactive')}</Radio>
                  <Radio value="1">{t('provider:detail_form.active')}</Radio>
                </Radio.Group>
              </Form.Item>
            </ChannelUpdateForm>
          </StateView>
        </ModalChannelUpdate> */}

      {/* update modal  */}
      {/* update content modal  */}
      <ModalContentUpdate
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        showModal={openContentModal}
        channel_id={channel_id}
        contentsList={contentsList}
        t={t}
        contentController={contentController}
      />

      {/* update content modal  */}
      <div className="main_sec">
        <StateView state={controller.stateview}>
          <div className="title-box">
            <h2>مشخصات کانال</h2>
            <Button className="typic_btn" onClick={RouteHandler}>
              همه کانال ها
            </Button>
          </div>

          <Divider className="dvider" />
          <SingleDetails
            openUpdateChannelModal={openUpdateChannelModal}
            t={t}
            data={channelSingle}
            controller={controller}
            contentController={contentController}
            orderController={orderController}
          />
        </StateView>
        <StateView state={controller.stateview}>
          <AllContents
            openContentModal={openContentModal}
            contents={contentsList}
            deleteHandler={deleteHandler}
          />
        </StateView>
      </div>
    </MainLayout>
  );
});

export default channel_single;
