import { MainController } from './MainController'
import AllProvidersModel from 'extras/models/classModels/AllProvidersModel'
import { makeObservable, action, makeAutoObservable } from 'mobx'
import { DataService } from 'extras/api'
import Cookies from 'js-cookie'
import Router from 'next/router'
import ProviderModel from 'extras/models/classModels/ProviderModel'
import StateView from 'extras/components/StateView/StateView'
import { message } from 'antd'

export default class AfterRegisterController {
  router = null
  loading = false
  err = ''
  provider = {}
  response
  success = false

  constructor() {
    makeAutoObservable(this)
  }

  // just set success to false
  successHandle = () => {
    this.success = false
  }

  url = ''
  token = null
  stateview = StateView.State.loading

  setRoute(r) {
    this.router = r
  }
  // resend email

  setSubmited = (query) => {
    if (query === 'success') {
      this.submited = true
    } else {
      this.submited = false
    }
  }
  onSuccessResendEmail = async (res) => {
    this.loading = false
    this.submited = false
  }

  onErrorResendEmail = (e) => {
    console.log(e)
  }

  resendEmail = (data, route = 'resendEmail') => {
    this.loading = true
    this.submited = true

    DataService.sendData(
      data,
      route,
      this.onSuccessResendEmail,
      this.onErrorResendEmail,
    )
  }

  // forget password
  onSuccessForgetPassword = async (res) => {
    this.loading = false
    console.log(res)
    if (res.data) {
      message.success('ایمیل با موفقیت ارسال شد')
      this.success = true
    }
  }

  onErrorForgetPassword = (e) => {
    this.loading = false

    console.log(e)
    message.error(e.data.errors)
  }

  sendForgetPassword = (data, route = 'forgotPassword') => {
    this.loading = true

    DataService.sendData(
      data,
      route,
      this.onSuccessForgetPassword,
      this.onErrorForgetPassword,
    )
  }

  // new password reset
  onSuccessForgetPassReset = async (res) => {
    this.loading = false
    console.log(res)
    this.submited = true
    console.log(Router)
  }

  onErrorForgetPassReset = (e) => {
    this.submited = false
    console.log(e)

    console.log(Router)
  }

  sendPassReset = (data, route = 'resetPassword') => {
    this.loading = true
    DataService.sendData(
      data,
      route,
      this.onSuccessForgetPassReset,
      this.onErrorForgetPassReset,
    )
  }

  // update account

  ///getUserInfo///
  getNewUserInfoSuccess = async (res) => {
    const providerModel = new ProviderModel()
    providerModel.setVals(res.data.item)

    this.provider = providerModel
    this.stateview = StateView.State.content
  }

  onErrorGetUser = (e) => {
    console.log(e)
    this.stateview = StateView.State.error
  }

  getUserInfo = (data = {}, route = 'getAccounts') => {
    this.stateview = StateView.State.loading

    DataService.fetchData(
      data,
      route,
      (res) => this.getNewUserInfoSuccess(res),
      this.onErrorGetUser,
    )
  }
  onSuccessUpdate = (res, callback) => {
    this.loading = false
    if (res.data) {
      message.success('اکانت با موفقیت بروزرسانی شد')
    }
    callback()
  }

  onErrorUpdate = (e) => {
    console.log(e)
    this.loading = false
    message.success(e.data.error)
  }

  accountUpdate = (data = {}, callback, route = 'updateAccount') => {
    this.loading = true

    DataService.sendData(
      data,
      route,
      (res) => this.onSuccessUpdate(res, () => callback(data)),
      this.onErrorUpdate,
    )
  }

  // change password
  onSuccessChangePass = (res) => {
    this.loading = false
    Router.push('/provider/auth/login')
    if (res.data) {
      message.success('کلمه عبور با موفقیت بروزرسانی شد')
    }
    // callback()
  }

  onErrorChangePass = (e) => {
    console.log(e)
    this.loading = false
    message.error(e.message)
  }

  changePass = (data = {}, route = 'changePassword') => {
    this.loading = true

    DataService.sendData(
      data,
      route,
      (res) => this.onSuccessChangePass(res),
      this.onErrorChangePass,
    )
  }
}
