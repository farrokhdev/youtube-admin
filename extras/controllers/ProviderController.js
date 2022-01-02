import MainModel from 'extras/models/classModels/MainModel'
import { makeObservable } from 'mobx'
import StateView from 'extras/components/StateView/StateView'
import { DataService } from 'extras/api'

export default class ProviderController extends MainModel {
  constructor() {
    super()
    makeObservable(this)
  }

  stateview = StateView.State.loading

  loading = false

  // get provider info
  //_______________________

  onsuccessAccInfo = (res) => {
    this.loading = false

    console.log(res)
  }

  onerrorAccInfo = (e) => {
    this.loading = false
    console.log(e)
  }

  getProviderInfo = (data = {}, router = 'getAccounts') => {
    this.loading = true

    DataService.sendData(
      data,
      router,
      this.onsuccessAccInfo,
      this.onerrorAccInfo,
    )
  }
}
