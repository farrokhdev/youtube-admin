import MainModel from '../MainModel'
import { makeObservable, observable, makeAutoObservable } from 'mobx'

export default class SettelmentModel {
  id = ''
  amount = ''
  status = ''
  response_code = ''
  bank = ''
  card_owner_name = ''
  bank_sheba = ''
  card_number = ''
  deposited_at = ''
  created_at = ''

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
