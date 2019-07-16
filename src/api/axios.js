import axios from 'axios'
import JSONBig from 'json-bigint'
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  transformResponse: [(data) => {
    // 处理格式
    // data 可能没有数据 null
    if (data) {
      return JSONBig.parse(data)
    }
    return data
  }]
  //   headers: {
  //     Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hmtoutiao')).token
  //   // Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hmtoutiao')).token
  //   }

})

instance.interceptors.request.use((config) => {
  const user = window.sessionStorage.getItem('hmtoutiao')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  // Do something with response data
  return response
}, (error) => {
  // Do something with response error
  if (error.response && error.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
export default instance
