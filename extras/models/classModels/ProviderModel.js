import MainModel from './MainModel'
import { makeAutoObservable, makeObservable } from 'mobx'

export default class ProviderModel {
  constructor() {
    makeAutoObservable(this)
  }

  id = ''
  name = ''
  family = ''
  email = ''
  commission = ''
  created_at = ''

  get fullname() {
    return this.name + ' ' + this.family
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
}
