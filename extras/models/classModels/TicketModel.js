import MainModel from './MainModel'
import { makeObservable } from 'mobx'

export default class TicketModel extends MainModel {
  id = ''
  department = ''
  user_type = ''
  user_id = ''
  ticket_number = ''
  subject = ''
  message = ''
  status = ''
  seen = ''
  attache = ''
  source_type = ''
  source_id = ''
  updated_at = ''
  user = ''
  replies = []

  constructor() {
    super()
    makeObservable(this)
  }
}
