const axios = require('axios')
const qs = require('qs')
const postHandles = {
  qs(data) {
    return { data: qs.stringify(data) }
  },
  form(data, { headers = {} }) {
    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key])
    })
    return {
      data: formData,
      headers: { ...headers, 'Content-Type': 'multipart/form-data' },
    }
  },
  none(data) {
    return { data }
  },
}
const dataHandles = {
  get(params) {
    return { params }
  },
  post(data, config, type = 'qs') {
    return postHandles[type](data, config)
  },
}
function getConfig(url, method, data = {}, options = { type: 'qs' }) {
  method = method ? method.toLocaleLowerCase() : 'get'
  const config = {
    method,
    url,
    ...options,
  }
  return { ...config, ...dataHandles[method](data, config, options.type) }
}
function createRequest(instance) {
  return function (...argvs) {
    return new Promise((resolve, reject) => {
      instance(getConfig(...argvs))
        .then((res) => {
          resolve(res.data)
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
}

export function createHttp(
  baseConfig = {
    timeout: 15000,
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
  },
  interceptors
) {
  const instance = axios.create(baseConfig)
  if (interceptors) {
    instance.interceptors.request.use(...interceptors.request)
    instance.interceptors.response.use(...interceptors.response)
  }
  const request = createRequest(instance)
  return request
}
