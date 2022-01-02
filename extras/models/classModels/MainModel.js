import React from 'react'
import { action, makeObservable, override } from 'mobx'

export default class MainModel {
  @action setVal = (key, val) => {
    if (this[key] != undefined) {
      this[key] = val
    }
  }

  @action setVals = (data) => {
    try {
      Object.keys(data).map((item, key) => {
        if (this[item] !== undefined) {
          this[item] = data[item]
        } else {
          // console.log(item)
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  @action getCustomVals = (data) => {
    const result = {}
    try {
      data.map((e) => {
        if (this[e] !== undefined) {
          result[e] = this[e]
        }
      })
      return result
    } catch (e) {}
  }
}
