import { createHttp } from '../utils/http'
const request = createHttp(undefined, {
  request: [
    function (config) {
      console.log('request')
      return config
    },
    function (e) {
      console.log(e)
      return Promise.reject(e)
    },
  ],
  response: [
    function (response) {
      console.log('response')
      return response
    },
    function (e) {
      console.log(e)
      return Promise.reject(e)
    },
  ],
})
let apis = require.context('./', true, /\.js$/)
apis = apis.keys().reduce((total, apiPath) => {
  const apiName = apiPath.match(/.*\/(.*)\.js$/)[1]
  if (apiName !== 'index') {
    return { ...total, ...apis(apiPath).default(request) }
  }
  return total
}, {})
export default {
  install(app) {
    app.config.globalProperties.$api = apis
    app.config.globalProperties.$request = request
  },
  ...apis,
}
