import MainModel from './MainModel'
import { makeObservable, observable, makeAutoObservable } from 'mobx'

export default class EventModel extends MainModel {
  id = ''
  start = ''
  end = ''
  // color = '#' + Math.random().toString(16).substr(-6)

  constructor() {
    super()
    makeObservable(this)
  }

  //   setVals = (data) => {
  //     try {
  //       Object.keys(data).map((item, key) => {
  //         if (this[item] !== undefined) {
  //           this[item] = data[item]
  //         } else {
  //           // console.log(item)
  //         }
  //       })
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }
}
