const path = require('path')
const chai = require('chai')
const expect = chai.expect
const request = require('superagent')

const lib = require('./lib')
const config = require('../config')
const BASE_URL = config.phicomm.BASE_URL
const url = `${BASE_URL}/ResourceManager/app/pipe/resource`

let token
let deviceSN

describe(path.basename(__filename), () => {
  before(async () => {
    token = await lib.getToken()
    const device = await lib.getDevice(token)
    console.log(device);
    deviceSN = device.deviceSN
  })

  it('GET /token should return success', done => {
    request
      .post(url)
      .set('Authorization', token)
      .send({
        deviceSN: deviceSN,
        data: {
          verb: 'GET',
          urlPath: '/token',
          params: {},
          body: {}
        }
      })
      .end((err, res) => {
        if (res.statusCode === 200) {
          const { error } = JSON.parse(res.text)
          expect(error === '0')
          done()
        } else {
          done(err)
        }
      })
  })

  it('GET /boot should return success', done => {
    request
      .post(url)
      .set('Authorization', token)
      .send({
        deviceSN: deviceSN,
        data: {
          verb: 'GET',
          urlPath: '/boot',
          params: {},
          body: {}
        }
      })
      .end((err, res) => {
        if (res.statusCode === 200) {
          const { error } = JSON.parse(res.text)
          expect(error === '0')
          done()
        } else {
          done(err)
        }
      })
  })

  it('GET /device/timedate should return success', done => {
    request
      .post(url)
      .set('Authorization', token)
      .send({
        deviceSN: deviceSN,
        data: {
          verb: 'GET',
          urlPath: '/device/timedate',
          params: {},
          body: {}
        }
      })
      .end((err, res) => {
        if (res.statusCode === 200) {
          const { error } = JSON.parse(res.text)
          expect(error === '0')
          done()
        } else {
          done(err)
        }
      })
  })
})
