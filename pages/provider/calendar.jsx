import React, { useState, useEffect } from 'react'
import { MainLayout } from 'extras/Layout/MainLayout'
import StateView from 'extras/components/StateView/StateView'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import dynamic from 'next/dynamic'
import OrderController from 'extras/controllers/OrderController'

const controller = new OrderController()

const calendar = observer(() => {
  const FullCalenderDynamic = dynamic(
    () => import('extras/components/CalendarComp/CalendarComp'),
    {
      ssr: false,
      loading: () => <p>...</p>,
    },
  )

  useEffect(() => {
    controller.getEvents()
  }, [])

  console.log(controller.eventList)

  const { t } = useTranslation()

  return (
    <StateView state={controller.stateview}>
      <MainLayout>
        <div className="calendar_sec">
          <FullCalenderDynamic list={controller.eventList} />
        </div>
      </MainLayout>
    </StateView>
  )
})

export default calendar
