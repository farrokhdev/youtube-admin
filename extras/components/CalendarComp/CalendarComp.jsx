import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { ModalCalendar } from '../Modals/ModalCalendar'
import { CalendarModalDetails } from '../Widget/Details/CalendarModalDetails'
import StateView from '../StateView/StateView'

// import interactinPlugin from '@fullcalendar/interaction'

// webpack must be configured to do this

const text = {
  today: 'امروز',
  month: 'ماه',
  week: 'هفته',
  day: 'روز',
  list: 'لیست',
}

const CalendarComp = ({ controller, list }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = (event) => {
    console.log(event.event._def.publicId)
    controller.getOrderview({ order_id: event.event._def.publicId })
    setIsModalVisible(true)
  }

  console.log(list)

  return (
    <>
      {/* modal  */}

      <ModalCalendar
        title={'اطلاعات رویداد'}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        showModal={showModal}
      >
        <CalendarModalDetails
          controller={controller}
          data={controller.orderDetail}
        />
      </ModalCalendar>

      {/* modal end  */}
      <FullCalendar
        buttonText={text}
        locale="fa"
        firstDay="6"
        direction="rtl"
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={list}
        windowResize={FullCalendar}
        height={500}
        eventClick={showModal}
        handleWindowResize={true}
      />
    </>
  )
}
export default CalendarComp
