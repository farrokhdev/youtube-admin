import { makeAutoObservable } from 'mobx'
import ProviderModel from 'extras/models/classModels/ProviderModel'
import NotificationModel from 'extras/models/classModels/NotificationModel'

const isServer = typeof window === 'undefined'
// enableStaticRendering(isServer);
export class coreProviderController {
  name = ''
  family = ''
  email = ''
  count = ''

  provider = new ProviderModel()
  notification = new NotificationModel()

  constructor() {
    makeAutoObservable(this)
    if (!isServer) {
      this.setDataFormLocal()
    }
  }
  setDataFormLocal = () => {
    this.provider.name = localStorage.getItem('name')
    this.provider.family = localStorage.getItem('family')
    this.provider.email = localStorage.getItem('email')
  }
  setNotification = (data) => {
    this.count = data
  }

  setProviderData = (data) => {
    this.provider.setVals(data)
  }
  setVals = (data) => {
    try {
      Object.keys(data).map((item, key) => {
        if (this[item] !== undefined) {
          this[item] = data[item]
        } else {
          console.log(item)
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
  // setVal = (key, val) => {
  //   console.log(key, val, this[key])
  //   if (this[key] != undefined && val != undefined) {
  //     this[key] = val
  //   }
  // }
}
let store = null

export default function initializeStore(isServer, initialData) {
  if (isServer) {
    return new coreProviderController(isServer, initialData)
  }
  if (store === null) {
    store = new coreProviderController(isServer, initialData)
  }
  return store
}
