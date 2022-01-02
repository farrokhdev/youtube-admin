import React, { Component } from 'react'
import { DataService } from 'extras/api'
import { makeAutoObservable } from 'mobx'
import StateView from 'extras/components/StateView/StateView'
import Router from 'next/router'
import TicketModel from 'extras/models/classModels/TicketModel'
import { message } from 'antd'

export default class TicketController {
  loading = false

  ticketList = []
  ticketItem = {}
  uploadVal = ''
  stateview = StateView.State.loading

  ticket_close

  constructor() {
    makeAutoObservable(this)
  }

  // get All tickets
  onsuccessAllTickets = (res) => {
    this.loading = false
    const list = []
    console.log(res.data)
    res.data.items.map((item) => {
      const ticketItem = new TicketModel()

      ticketItem.setVals(item)
      list.push(ticketItem)
    })

    this.ticketList = list
    this.stateview = StateView.State.content
  }

  onerrorAllTickets = (e) => {
    this.loading = false
    console.log(e)
    this.stateview = StateView.State.error
  }

  getAllTickets = (data = {}, router = 'getTickets') => {
    this.loading = true
    console.log(data)
    this.stateview = StateView.State.loading

    DataService.fetchData(
      data,
      router,
      this.onsuccessAllTickets,
      this.onerrorAllTickets,
    )
  }
  // GET SINGLE TICKET
  onsuccessSingleTicket = (res) => {
    this.loading = false
    const ticket = ''
    console.log(res.data)
    const singleTicket = new TicketModel()

    singleTicket.setVals(res.data.item)

    this.ticketItem = singleTicket

    console.log(this.ticketItem)

    this.stateview = StateView.State.content
  }

  onerrorSingleTicket = (e) => {
    this.loading = false
    this.stateview = StateView.State.error
    console.log(e)
  }

  getTicket = (data = {}, router = 'singleTicket') => {
    this.loading = true
    this.stateview = StateView.State.loading
    console.log(data)
    DataService.fetchData(
      data,
      router,
      this.onsuccessSingleTicket,
      this.onerrorSingleTicket,
    )
  }
  // REPLY SINGLE TICKET
  onsuccessReplyTicket = (res) => {
    this.loading = false

    this.ticketItem.replies.unshift(res.data.item)

    if (res.data) {
      message.success('جواب با موفقیت ارسال شد')
    }

    // this.stateview = StateView.State.content
  }

  onerrorReplyTicket = (e) => {
    this.loading = false
    console.log(e)
    message.error(e.data.error)

    // this.stateview = StateView.State.error
  }

  replyTicket = (data = {}, router = 'replyTicket') => {
    this.loading = true
    // this.stateview = StateView.State.loading
    console.log(data)

    DataService.sendData(
      data,
      router,
      this.onsuccessReplyTicket,
      this.onerrorReplyTicket,
    )
  }
  // send ticket and upload

  // upload attache for ticket

  onsuccessUploadTickets = (res) => {
    this.loading = false

    this.uploadVal = res.data.value
    console.log(this.uploadVal)
    if (res.data) {
      message.success('آپلو با موفقیت انجام شد')
    }
  }

  onerrorUploadTickets = (e) => {
    this.loading = false
    message.error(e.data.file)

    console.log(e)
  }

  uploadTicket = (data = {}, router = 'uploadTicket') => {
    this.loading = true

    console.log(data)

    DataService.sendData(
      data,
      router,
      this.onsuccessUploadTickets,
      this.onerrorUploadTickets,
    )
  }

  // send tickert
  onsuccessSendTickets = (res) => {
    this.loading = false
    console.log(res.data)
    Router.push('/provider/tickets')
    this.stateview = StateView.State.content

    if (res.data) {
      message.success('ارسال تیکت با موفقیت انجام شد')
    }
  }

  onerrorSendTickets = (e) => {
    this.loading = false
    console.log(e)
    message.error(e.data.error)

    this.stateview = StateView.State.error
  }

  sendTicket = (data = {}, router = 'addTicket') => {
    this.loading = true
    this.stateview = StateView.State.loading

    console.log(data)
    DataService.sendData(
      data,
      router,
      this.onsuccessSendTickets,
      this.onerrorSendTickets,
    )
  }
  // close tickert
  onsuccessCloseTickets = (res) => {
    this.loading = false
    console.log(res.data)

    this.ticket_close = res.data.item.status

    if (res.data) {
      message.success('تیکت بسته شد')
    }
    this.stateview = StateView.State.content
  }

  onerrorCloseTickets = (e) => {
    this.loading = false
    message.error(e.data.error)
    this.stateview = StateView.State.error
    console.log(e)
  }

  closeTicket = (data = {}, router = 'closeTicket') => {
    this.loading = true
    this.stateview = StateView.State.loading

    DataService.sendData(
      data,
      router,
      this.onsuccessCloseTickets,
      this.onerrorCloseTickets,
    )
  }
}
