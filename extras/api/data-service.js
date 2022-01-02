import { routerList } from './Connector'
// import axios from 'axios'

export class DataService {
  static fetchData = async (data, route, onSuccess, onError) => {
    try {
      await routerList()
        [route].fetch(null, data)
        .then((res) => {
          onSuccess(res, route)
        })
        .catch((error) => {
          onError(error)
        })
    } catch (e) {
      onError(e)
    }
  }

  static getData = async (param, data, route, onSuccess, onError) => {
    try {
      await routerList()
        [route].fetch(param, data)
        .then((res) => {
          onSuccess(res, route)
        })
        .catch((error) => {
          onError(error)
        })
    } catch (e) {
      onError(e)
    }
  }

  static sendDataParam = async (param, data, route, onSuccess, onError) => {
    try {
      await routerList()
        [route].post(param, data)
        .then((res) => {
          onSuccess(res, route)
        })
        .catch((error) => {
          onError(error)
        })
    } catch (e) {
      onError(e)
    }
  }

  static sendData = async (data, route, onSuccess, onError) => {
    try {
      routerList()
        [route].post(null, data)
        .then((res) => {
          onSuccess(res, route)
        })
        .catch((error) => onError(error))
    } catch (e) {
      onError(e)
    }
  }
}
