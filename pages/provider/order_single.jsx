import React, { useEffect, useState } from 'react'
import ChannelController from 'extras/controllers/ChannelController'
import { observer } from 'mobx-react'
import StateView from 'extras/components/StateView/StateView'
import { MainLayout } from 'extras/Layout/MainLayout'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Form, Select, Radio, Slider, Button, Divider } from 'antd'
import { ModalChannelUpdate } from 'extras/components/Modals/ModalChannelUpdate'
import { ChannelUpdateForm } from 'extras/components/Form/ChannelUpdateForm'
import { AllContents } from 'extras/components/Widget/SingleComponents/AllContents/AllContents'
import Router from 'next/router'
import { OrderDetails } from 'extras/components/Widget/Details/OrderDetails'
import OrderController from 'extras/controllers/OrderController'

const { Option } = Select
const controller = new OrderController()

const Order_single = observer(() => {
  const router = useRouter()
  const { t } = useTranslation()
  const [add, setAdd] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    controller.getOrderview({ order_id: router.query.id })
  }, [])

  const RouteHandler = () => {
    Router.push('/provider/orders')
  }

  return (
    <MainLayout>
      <div className="main_sec">
        <div className="title-box">
          <h2>{t('provider:singleOrder.title')}</h2>
          <Button className="typic_btn" onClick={RouteHandler}>
            {t('provider:singleOrder.button')}
          </Button>
        </div>
        <Divider className="dvider" />

        <StateView state={controller.stateview}>
          <OrderDetails
            t={t}
            data={controller.orderDetail}
            controller={controller}
          />
        </StateView>
      </div>
    </MainLayout>
  )
})

export default Order_single
