const rp = require('request-promise')

const config = require('../config')

const {
  BASE_URL,
  phonenumber,
  password,
  authorizationcode } = config.phicomm
  
module.exports = {
  async getToken() {
    const res = await rp({
      method: 'POST',
      uri: `${BASE_URL}/v1/login`,
      qs: {
        phonenumber,
        password,
        authorizationcode
      }
    })
    return JSON.parse(res).access_token
  },

  async getDevice(token) {
    const res = await rp({
      method: 'GET',
      uri: `${BASE_URL}/StationManager/station`,
      qs: {
        phonenumber,
        password,
        authorizationcode
      },
      headers: { authorization: token }
    })
    const data = JSON.parse(res)
    const devices = data.result.list
    for (const device of devices) {
      if (device.onlineStatus === 'online') {
        return device
      }
    }
  }
}
