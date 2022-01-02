import React, { Component } from 'react'
import { DataService } from 'extras/api'
import { makeAutoObservable } from 'mobx'
import Router from 'next/router'
import AllChannelsModel from '../models/classModels/AllChannelsModel'
import ChannelModel from 'extras/models/classModels/ChannelModel'
import StateView from 'extras/components/StateView/StateView'
import CategoriesModel from 'extras/models/classModels/CategoriesModel'
import ContentModel from 'extras/models/classModels/ContentModel'

import { message } from 'antd'

export default class ChannelController {
  loading = false
  response = null
  channel_id
  response
  channelModel = new ChannelModel()
  channelListModel = new AllChannelsModel()

  // for single channel page
  categories = []

  // providerSingle = new ProviderModel()
  categorySingle = new CategoriesModel()
  categorieListAll = [] //array of categories
  channelSingle = new ChannelModel() //single channel item
  searchchannelList = [] //array of channels
  allChannels = [] //array of channels
  allSearchContents = []
  page = 1

  stateview = StateView.State.loading

  constructor() {
    makeAutoObservable(this)
  }

  onsuccessAll = () => {
    this.stateview = StateView.State.content
  }

  // just for modals views
  onsuccessModal = () => {
    this.stateview = StateView.State.content
  }

  // search channels
  onsuccessChannels = (res) => {
    this.loading = false
    this.response = res.success
    if (this.response === true) {
      const list = []
      res.data.items.map((item) => {
        const model = new ChannelModel()
        model.setVals(item)
        list.push(model)
      })
      this.searchchannelList = list
    }

    this.stateview = StateView.State.content
  }

  onerrorChannels = (e) => {
    this.loading = false
    console.log(e)
    this.stateview = StateView.State.error
  }

  getSearchChannel = (data = {}, router = 'getSearchChannels') => {
    this.loading = true
    this.stateview = StateView.State.loading

    DataService.fetchData(
      data,
      router,
      this.onsuccessChannels,
      this.onerrorChannels,
    )
  }

  // view channels details
  onsuccessDetailsChannels = (res, indx, callback) => {
    const catList = []
    console.log(res)

    res.data.categories.map((item) => {
      const category = new CategoriesModel()
      category.setVals(item)
      catList.push(category)
    })
    this.categorieListAll = catList

    this.channelSingle.setVals(res.data.channel)

    this.searchchannelList[indx].loading = false
    callback()
  }

  onerrorDetailsChannels = (e, indx) => {
    this.searchchannelList[indx].loading = false
    console.log(e)
    this.stateview = StateView.State.error
  }

  getChannelDetails = (
    indx,
    data = {},
    callback,
    router = 'getChannelDetails',
  ) => {
    this.searchchannelList[indx].loading = true
    console.log(data)
    this.stateview = StateView.State.loading

    DataService.fetchData(
      data,
      router,
      (res) => this.onsuccessDetailsChannels(res, indx, callback),
      (res) => this.onerrorDetailsChannels(res, indx),
    )
  }
  // SHOW CHANNEL DETAILS
  //___________________________

  onsuccessShowDetails = (res) => {
    this.loading = false
    const list = []
    console.log(res)

    this.channelSingle.setVals(res.data.channel)
    this.stateview = StateView.State.content
  }

  onerrorShowDetails = (e) => {
    this.loading = false
    console.log(e)

    this.stateview = StateView.State.error
  }

  showChannelDetails = (data = {}, router = 'getShowChannelDetails') => {
    this.loading = true
    this.stateview = StateView.State.loading

    DataService.fetchData(
      data,
      router,
      (res) => this.onsuccessShowDetails(res),
      this.onerrorShowDetails,
    )
  }

  // GET CHANNEL CONTENTS
  //_______________________

  onsuccessChannelContent = (res) => {
    this.loading = false
    const contentList = []
    res.data.items.map((item) => {
      const content = new ContentModel()
      content.setVals(item)
      contentList.push(content)
    })
    this.allSearchContents = contentList
    this.stateview = StateView.State.content
  }

  onerrorChannelContent = (e) => {
    this.loading = false
    console.log(e)
    this.stateview = StateView.State.error
  }

  getChannelContent = (data = {}, router = 'getChannelContents') => {
    this.loading = true
    console.log(data)
    this.stateview = StateView.State.loading

    DataService.fetchData(
      data,
      router,
      (res) => this.onsuccessChannelContent(res),
      this.onerrorChannelContent,
    )
  }

  // add channel
  onSuccAddChannel = (res) => {
    this.loading = false
    if (res.data) {
      message.success('کانال با موفقیت اضافه شد')
    }
  }

  onErrAddChannel = (e) => {
    this.loading = false
    console.log(e)
    message.error(e.data.error)
  }

  addChannel = (data = {}, router = 'addChannel') => {
    this.loading = true

    DataService.sendData(
      data,
      router,
      this.onSuccAddChannel,
      this.onErrAddChannel,
    )
  }

  // get All channels
  onsuccessAllChannels = (res) => {
    this.loading = false
    console.log(res.data)
    const list = []

    res.data.items.map((item) => {
      const channel = new ChannelModel()
      channel.setVals(item)
      list.push(channel)
    })

    this.allChannels = list
    // this.channelListModel.setVals(res.data)
    console.log(this.channelListModel)

    this.stateview = StateView.State.content
  }

  onerrorAllChannels = (e) => {
    this.loading = false
    this.stateview = StateView.State.error
    console.log(e)
  }

  setPage = (page) => {
    this.page = page
  }

  getAllChannels = (data = {}, router = 'getChannelList') => {
    this.loading = true
    console.log(data)
    DataService.fetchData(
      data,
      router,
      this.onsuccessAllChannels,
      this.onerrorAllChannels,
    )
  }
  // delete channel
  onsuccessDeleteChannels = (res, callback) => {
    this.loading = false
    if (res.data) {
      callback()
      message.success('کانال مورد نظر حذف شد')
    }
  }

  onerrorDeleteChannels = (e) => {
    this.loading = false
    console.log(e)
    message.error(e.data.error)
  }

  deleteChannels = (data = {}, callback, router = 'deleteChannel') => {
    this.loading = true

    DataService.sendData(
      data,
      router,
      (res) => this.onsuccessDeleteChannels(res, callback),
      this.onerrorDeleteChannels,
    )
  }
  // update channel
  onsuccessUpdateChannels = (res, index) => {
    this.loading = false
    console.log(data)
    // callback()
    if (res.data) {
      message.success('کانال با موفقیت بروزرسانی شد')
    }
  }

  onerrorUpdateChannels = (e) => {
    this.loading = false

    console.log(e)
    message.error(e.data.error)
  }

  updateChannel = (data = {}, index, router = 'updateChannel') => {
    this.loading = true
    DataService.sendData(
      data,
      router,
      (res) => this.onsuccessUpdateChannels(res, index),
      this.onerrorUpdateChannels,
    )
  }

  //get channel categories
  //****************************** */
  onsuccessCats = (res) => {
    this.loading = true
    console.log(res)

    const cats = []

    res.data.items.map((item) => {
      const catmodel = new CategoriesModel()
      catmodel.setVals(item)
      cats.push(catmodel)

      this.categories = cats
    })

    this.stateview = StateView.State.content
  }

  onerrorCats = (e) => {
    console.log(e)
    this.stateview = StateView.State.error
  }

  getCategories = (data = {}, router = 'Categories') => {
    this.stateview = StateView.State.loading

    DataService.fetchData(
      data,
      router,
      (res) => this.onsuccessCats(res),
      this.onerrorCats,
    )
  }
}
