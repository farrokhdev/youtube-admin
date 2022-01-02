import { makeObservable, observable } from 'mobx'

export default class AllProvidersModel {
  providers = []
  constructor() {
    makeObservable(this)
  }
}
