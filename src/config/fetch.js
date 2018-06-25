import { baseUrl, loginImgUrl } from './env'
import Axios from 'axios'

let AxiosInstance = Axios.create()

export default async (url = '', data = {}, type = 'GET', credentials = false, loginImg = false) => {
  type = type.toUpperCase()

  if (loginImg) {
    url = loginImgUrl + url
  } else {
    url = baseUrl + url
  }

  if (type === 'GET') {
    let dataStr = '' // 数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
  }

  AxiosInstance.defaults.withCredentials = credentials

  try {
    if (type === 'POST') {
      let response = await AxiosInstance({
        method: 'post',
        url: url,
        params: data
      })
      return response
    }
  } catch (err) {
    throw new Error(err)
  }

  try {
    if (type === 'GET') {
      let response = await AxiosInstance({
        method: 'get',
        url: url
      })
      return response
    }
  } catch (err) {
    throw new Error(err)
  }
}
