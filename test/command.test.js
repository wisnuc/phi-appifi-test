const path = require('path')
const chai = require('chai')
const expect = chai.expect
const request = require('superagent')

const lib = require('./lib')
const config = require('../config')
const BASE_URL = config.phicomm.BASE_URL
const url = `${BASE_URL}/ResourceManager/app/pipe/command`

// {
//   'error': '50',
//   'msg': 'server error'
// }
let token
let deviceSN

describe(path.basename(__filename), () => {
  before(async () => {
    token = await lib.getToken()
    const device = await lib.getDevice(token)
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
        if (err) return done(err)
        if (res.statusCode === 200) {
          const { error } = JSON.parse(res.text)
          expect(error).to.equal('0')
          done()
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
        if (err) return done(err)
        if (res.statusCode === 200) {
          const { error } = JSON.parse(res.text)
          expect(error).to.equal('0')
          done()
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
        if (err) return done(err)
        if (res.statusCode === 200) {
          const { error } = JSON.parse(res.text)
          expect(error).to.equal('0')
          done()
        }
      })
  })

  it('GET /drives should return success', done => {
    request
      .post(url)
      .set('Authorization', token)
      .send({
        deviceSN: deviceSN,
        data: {
          verb: 'GET',
          urlPath: '/drives',
          params: {},
          body: {}
        }
      })
      .end((err, res) => {
        if (err) return done(err)
        if (res.statusCode === 200) {
          // const result = JSON.parse(res.text).result.data.res
          const { error, result } = JSON.parse(res.text)
          expect(error).to.equal('0')
          const data = result.data.res
          for (const d of data) {
            if (d.type === 'private') {
              console.log(d.uuid);
            }
          }
          done()
        }
      })
  })

})
