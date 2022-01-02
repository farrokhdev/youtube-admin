import MainModel from 'extras/models/classModels/MainModel'
import { makeAutoObservable, makeObservable } from 'mobx'
import StateView from 'extras/components/StateView/StateView'
import { DataService } from 'extras/api'
import { Router } from 'next/router'
import OrderModel from 'extras/models/classModels/OrderModel'
import EventModel from 'extras/models/classModels/EventModel'
import { message } from 'antd'

export default class OrderController {
  constructor() {
    // super()
    makeAutoObservable(this)
  }

  response = false
  loading = false
  allOrders = []
  orderDetail = new OrderModel()
  stateview = StateView.State.loading
  // for steps in order details
  currentState
  eventList = []
  // status = 'wait'

  // GET All orders
  //_______________________

  onsuccessAllOrders = (res) => {
    const orderList = []
    this.loading = false

    res.data.items.map((item) => {
      const orders = new OrderModel()
      orders.setVals(item)

      orderList.push(orders)
    })

    this.allOrders = orderList
    this.stateview = StateView.State.content
  }

  onerrorAllOrders = (e) => {
    this.loading = false
    console.log(e)
    this.stateview = StateView.State.error
  }

  getAllOrders = (data = {}, router = 'orderList') => {
    this.loading = true

    this.stateview = StateView.State.loading

    DataService.fetchData(
      data,
      router,
      (res) => this.onsuccessAllOrders(res),
      this.onerrorAllOrders,
    )
  }
  // order view
  //_______________________

  onsuccessOrderview = (res) => {
    this.loading = false
    this.orderDetail.setVals(res.data.item)

    console.log(res.data.item)
    if (res.data.item.status === 'paymented') {
      this.currentState = 1
    } else if (res.data.item.status === 'pending') {
      this.currentState = 1
    } else if (res.data.item.status === 'in_queue') {
      this.currentState = 2
    } else if (res.data.item.status === 'in_progress') {
      this.currentState = 3
    } else if (res.data.item.status === 'ended') {
      this.currentState = 5
    } else if (res.data.item.status === 'completed') {
      this.currentState = 5
    }

    console.log(this.status)

    this.stateview = StateView.State.content
  }

  onerrorOrderview = (e) => {
    this.loading = false
    console.log(e)
    this.stateview = StateView.State.error
  }

  getOrderview = (data = {}, router = 'orderView') => {
    this.loading = true

    this.stateview = StateView.State.loading

    DataService.fetchData(
      data,
      router,
      (res) => this.onsuccessOrderview(res),
      this.onerrorOrderview,
    )
  }
  // order accept
  //_______________________

  onsuccessOrderAccept = (res, id) => {
    this.loading = false
    this.orderDetail.setVals(res)

    if (res.data) {
      message.success('تایید شد')
      getOrderview({ order_id: id })
    }
  }

  onerrorOrderAccept = (e) => {
    this.loading = false
    console.log(e)
    message.error(e.data.error)
  }

  acceptOrderview = (data = {}, id, router = 'orderAccept') => {
    this.loading = true

    DataService.sendData(
      data,
      router,
      (res) => this.onsuccessOrderAccept(res, id),
      this.onerrorOrderAccept,
    )
  }
  // get events
  //_______________________

  onsuccessEvents = (res, callback) => {
    this.loading = false
    console.log(res)
    const list = []
    res.data.items.map((item) => {
      const model = new EventModel()
      model.setVals(item)
      list.push(model)
    })
    callback()

    this.eventList = list

    if (res.data) {
      // message.success('تغییرات بر اساس تاریخ اعمال شد')
    }

    this.stateview = StateView.State.content
  }

  onerrorEvents = (e) => {
    this.loading = false
    console.log(e)
    // message.error(e.data.error);
    this.stateview = StateView.State.error
  }

  getEvents = (data = {}, callback, router = 'events') => {
    this.loading = true
    this.stateview = StateView.State.loading
    DataService.fetchData(
      data,
      router,
      (res) => this.onsuccessEvents(res, callback),
      this.onerrorEvents,
    )
  }
}
