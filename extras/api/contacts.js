import axios from 'axios'
import Cookies from 'js-cookie'

export default axios.create({
  baseURL: 'http://192.168.1.10/customers/youtube_panel/public/api',
  headers: {
    Authorization: 'Bearer ' + Cookies.get('token'),
  },
})
