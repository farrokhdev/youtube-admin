import MainModel from 'extras/models/classModels/MainModel'
import { makeAutoObservable, makeObservable } from 'mobx'
import React, { Component } from 'react'
import ChannelModel from './ChannelModel'

export default class AllChannelsModel extends MainModel {
  items = []
  loading = false

  constructor() {
    super()
    makeObservable(this)
  }

  // setvals = (data) => {
  //   try {
  //     const list = []
  //     Object.keys(data).map((key) => {
  //       data[key].map((item) => {
  //         const channelDetails = new ChannelModel()
  //         channelDetails.setvals(item)

  //         list.push(channelDetails)
  //       })
  //     })
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
}
