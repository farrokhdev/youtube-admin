import MainModel from '../MainModel'
import { makeObservable, observable, makeAutoObservable } from 'mobx'

export default class WalletModel {
  balance = ''

  constructor() {
    // super()
    makeAutoObservable(this)
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
