import { makeAutoObservable, observable } from 'mobx'
import MainModel from './MainModel'

export default class ContentModel {
  id = ''
  title = ''
  thumbnail = ''
  view_count = ''
  duration = ''
  like_count = ''
  dislike_count = ''
  published_at = ''
  price_ads = ''
  price_suggestion = ''
  channel
  created_at = ''
  description = ''
  thumbnail = ''
  is_activated = ''
  is_blocked = ''
  grade
  channel = {
    grade: {},
  }

  modal = false
  loading = false

  constructor() {
    // super()s
    makeAutoObservable(this)
  }

  modalStatus = (status) => {
    this.modal = status
  }

  setVals = (data) => {
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
  setVal = (key, val) => {
    if (this[key] != undefined) {
      this[key] = val
    }
  }
}
