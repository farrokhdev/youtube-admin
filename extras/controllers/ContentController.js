import MainModel from 'extras/models/classModels/MainModel'
import { makeAutoObservable } from 'mobx'
import StateView from 'extras/components/StateView/StateView'
import { DataService } from 'extras/api'
import ContentModel from 'extras/models/classModels/ContentModel'
import { Router } from 'next/router'
import { message } from 'antd'

export default class ContentController {
  constructor() {
    makeAutoObservable(this)
  }

  stateview = StateView.State.loading
  response = false
  loading = false
  allContents = []
  contentDetails = new ContentModel()
  // for pagination
  pageNumber
  pageSize
  totalContent

  // Add CONTENTS
  //_______________________

  onsuccessAddContent = (res) => {
    this.loading = false

    this.response = true
    if (res.data) {
      message.success('ویدیو با موفقیت اضافه شد')
      this.stateview = StateView.State.content
    }
  }

  onerrorAddContent = (e) => {
    this.loading = false
    message.error(e.data.error)

    this.stateview = StateView.State.error
    console.log(e)
  }

  addContent = (data = {}, router = 'addContent') => {
    this.loading = true
    this.stateview = StateView.State.loading

    DataService.sendData(
      data,
      router,
      this.onsuccessAddContent,
      this.onerrorAddContent,
    )
  }

  // GET All CONTENTS
  //_______________________

  onsuccessAllContents = (res) => {
    const contentList = []
    this.loading = false
    this.pageNumber = res.data.page
    this.pageSize = res.data.page_size
    this.totalContent = res.data.contents_total
    res.data.items.map((item) => {
      const contents = new ContentModel()
      contents.setVals(item)
      contentList.push(contents)
    })

    this.allContents = contentList

    this.stateview = StateView.State.content
  }

  onerrorAllContent = (e) => {
    this.loading = false
    this.stateview = StateView.State.error
    console.log(e)
  }

  getAllContents = (data = {}, router = 'allContents') => {
    this.loading = true
    console.log(data)
    this.stateview = StateView.State.loading

    DataService.fetchData(
      data,
      router,
      (res) => this.onsuccessAllContents(res),
      this.onerrorAllContent,
    )
  }
  // VIEW CONTENT DETAILS
  //_______________________

  onsuccessViewContent = (res, callback) => {
    const contentList = []
    this.loading = false
    this.contentDetails.setVals(res.data.item)
    callback()
    this.stateview = StateView.State.content
  }

  onerrorViewContent = (e) => {
    this.loading = false
    this.stateview = StateView.State.error
    console.log(e)
  }

  viewContent = (data = {}, callback, router = 'viewContent') => {
    this.loading = true
    console.log(data)
    this.stateview = StateView.State.loading

    DataService.fetchData(
      data,
      router,
      (res) => this.onsuccessViewContent(res, callback),
      this.onerrorViewContent,
    )
  }
  // UPDATE CONTENT
  //_______________________

  onsuccessUpdate = (res) => {
    this.loading = false
    if (res.data) {
      message.success('محتوا با موفقیت بروزرسانی شد')
      this.stateview = StateView.State.content
    }
  }

  onerrorUpdate = (e) => {
    this.loading = false
    message.error(e.data.error)
    this.stateview = StateView.State.error
    console.log(e)
  }

  updateTheContent = (data = {}, router = 'updateContent') => {
    this.loading = true

    DataService.sendData(data, router, this.onsuccessUpdate, this.onerrorUpdate)
  }
  // DELETE CONTENT
  //_______________________

  onsuccessDelete = (res, callback) => {
    this.loading = false
    console.log(res.data)
    if (res.data) {
      message.success('کانال با موفقیت حذف شد')
      callback()
      // this.stateview = StateView.State.content
    }
  }

  onerrorDelete = (e) => {
    console.log(e)
    this.loading = false
    // message.error(e.data.message)
    this.stateview = StateView.State.error
  }

  deleteContent = (data = {}, callback, router = 'deleteContent') => {
    this.loading = true
    this.stateview = StateView.State.loading
    DataService.sendData(
      data,
      router,
      (res) => this.onsuccessDelete(res, callback),
      this.onerrorDelete,
    )
  }
}
