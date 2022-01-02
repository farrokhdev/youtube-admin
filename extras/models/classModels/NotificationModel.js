import MainModel from './MainModel'
import { makeAutoObservable, makeObservable } from 'mobx'

export default class NotificationModel extends MainModel {
  id = ''
  title = ''
  description = ''
  read_at = ''
  created_at = ''
  notifications = ''

  page = ''
  page_size = ''
  total = ''

  constructor() {
    super()
    makeObservable(this)
  }
}
