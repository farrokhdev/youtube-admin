import MainModel from '../MainModel'
import { makeObservable, observable, makeAutoObservable } from 'mobx'

export default class CardModel {
  id = ''
  provider_id = ''
  bank = ''
  bank_sheba = ''
  card_number = ''
  card_owner_name = ''

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
