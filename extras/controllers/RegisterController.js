import { MainController } from './MainController'
import AllProvidersModel from 'extras/models/classModels/AllProvidersModel'
import { makeObservable, action, makeAutoObservable } from 'mobx'
import { DataService } from 'extras/api'
import Cookies from 'js-cookie'
import Router from 'next/router'
import ProviderModel from 'extras/models/classModels/ProviderModel'
import StateView from 'extras/components/StateView/StateView'
import { message } from 'antd'

export default class RegisterController {
  router = null
  loading = false
  err = ''
  success = false
  response

  stateview = StateView.State.loading

  providertoken = Cookies.get('tokenprovider')

  constructor() {
    makeAutoObservable(this)
  }

  // list = []

  setRoute(r) {
    this.router = r
  }

  redirectToReg = () => {
    // console.log(this.providertoken)
    if (this.providertoken == undefined) {
      Router.push('/provider/auth/login')
    }
  }

  ///getUserInfo///
  getNewUserInfoSuccess = async (res, callback) => {
    await localStorage.clear()
    const providerModel = new ProviderModel()
    providerModel.setVals(res.data.item)

    this.provider = providerModel
    await localStorage.setItem('user_id', res.data.item.id)
    await localStorage.setItem('name', res.data.item.name)
    await localStorage.setItem('family', res.data.item.family)
    await localStorage.setItem('email', res.data.item.email)
    callback(res.data.item)

    // this.stateview = StateView.State.content
  }

  onErrorGetUser = (e) => {
    console.log(e)
    this.stateview = StateView.State.error
  }

  ////Login////
  getUserInfo = (callback, data = {}, route = 'getAccounts') => {
    // console.log(callback)
    this.stateView = StateView.State.loading
    DataService.fetchData(
      data,
      route,
      (res) => this.getNewUserInfoSuccess(res, callback),
      this.onErrorGetUser,
    )
  }

  onSuccessLogin = (res, callback) => {
    this.loading = false

    this.getUserInfo(callback)
    Cookies.set('tokenprovider', res.data.access_token, { expires: 30 })
    Cookies.set('isAuth', 1, { expires: 30 })
    if (res.data) {
      message.success('به پنل ادمین خوش آمدید')
      Router.push('/provider/dashboard')
    }

    // message.success(THelper.t('msg.logged_in'))
  }

  onErrorLogin = (e) => {
    console.log(e)
    this.loading = false
    message.error(e.data.message)
  }

  LoginUser = (data = {}, callback, route = 'login') => {
    this.loading = true
    console.log(data, callback)
    DataService.sendData(
      data,
      route,
      (res) => this.onSuccessLogin(res, callback),
      this.onErrorLogin,
    )
  }
  ////Login////

  ///REGISTER///

  getNewUserInfo = () => {
    // this.stateView = StateView.State.loading
    DataService.fetchData(
      data,
      route,
      () => this.getNewUserInfoSuccess(),
      this.onErrorGetUser,
    )
  }

  getSuccessRegisterAccount = (res) => {
    this.loading = false
    Cookies.set('tokenprovider', res.data.access_token, { expires: 30 })
    Cookies.set('isAuth', 1, { expires: 30 })
    if (res.data) {
      message.success('ایمیل فرساتده شد')
      this.success = true
    }

    this.stateView = StateView.State.content
  }

  onErrorRegister = (e) => {
    console.log(e)
    this.loading = false

    if (e.data.email) {
      this.response = e.data.email[0]
    } else if (e.data.error) {
      this.response = e.data.error
    } else if (e.data.name) {
      this.response = e.data.name[0]
    } else if (e.data.password) {
      this.response = e.data.password[0]
    }
    message.error(e.message)

    this.stateView = StateView.State.error
  }

  RegisterNewUser = (data = {}, route = 'register') => {
    this.loading = true
    this.stateView = StateView.State.loading

    DataService.sendData(
      data,
      route,
      (res) => this.getSuccessRegisterAccount(res),
      this.onErrorRegister,
    )
  }

  logout = () => {
    console.log('hi')
    Cookies.clear()
    localStorage.clear()
    location.replace('/login')
  }
}
